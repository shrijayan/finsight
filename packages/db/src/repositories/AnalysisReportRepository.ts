import { AnalysisReport as IAnalysisReport, CreateAnalysisReportData, UpdateAnalysisReportData } from 'lib/src/types';
import AnalysisReport from '../models/AnalysisReport';
import dbConnect from '../connection';
import { Document } from 'mongoose';
import mongoose from 'mongoose';

/**
 * Database-specific AnalysisReport interface
 * This excludes the _id field from the shared interface since Mongoose handles it differently
 */
interface DatabaseAnalysisReport extends Omit<IAnalysisReport, '_id'> {}

/**
 * AnalysisReport document interface extending Mongoose Document
 * This combines the database AnalysisReport interface with Mongoose Document methods
 */
export interface AnalysisReportDocument extends DatabaseAnalysisReport, Document {
  _id: mongoose.Types.ObjectId;
}

/**
 * AnalysisReportRepository class implementing the Repository Pattern
 * All database operations for AnalysisReport model should go through this repository
 * Following coding standards: no direct Mongoose calls in API routes
 */
export class AnalysisReportRepository {
  /**
   * Ensure database connection before operations
   * Skip connection in test environment (handled by test setup)
   */
  private async ensureConnection(): Promise<void> {
    // In test environment, connection is handled by test setup
    if (process.env.NODE_ENV === 'test' || process.env.JEST_WORKER_ID) {
      return;
    }
    await dbConnect();
  }

  /**
   * Create a new analysis report
   * @param reportData - Analysis report creation data
   * @returns Created analysis report
   */
  async create(reportData: CreateAnalysisReportData): Promise<IAnalysisReport> {
    await this.ensureConnection();
    
    const report = new AnalysisReport({
      userId: reportData.userId,
      uploadId: reportData.uploadId,
      reportTitle: reportData.reportTitle,
      sourceDocumentCount: reportData.sourceDocumentCount,
      status: reportData.status || 'processing',
      progress: reportData.progress || 0,
      generatedData: reportData.generatedData,
    });

    const savedReport = await report.save();
    return this.transformToPublicReport(savedReport);
  }

  /**
   * Find analysis report by ID
   * @param reportId - Report's MongoDB ObjectId as string
   * @returns Analysis report or null if not found
   */
  async findById(reportId: string): Promise<IAnalysisReport | null> {
    await this.ensureConnection();
    
    const report = await AnalysisReport.findById(reportId).exec();
    if (!report) return null;

    return this.transformToPublicReport(report);
  }

  /**
   * Find analysis reports by user ID
   * @param userId - User's MongoDB ObjectId as string
   * @param limit - Maximum number of reports to return (default: 50)
   * @returns Array of analysis reports sorted by creation date (newest first)
   */
  async findByUserId(userId: string, limit: number = 50): Promise<IAnalysisReport[]> {
    await this.ensureConnection();
    
    const reports = await AnalysisReport
      .find({ userId })
      .sort({ createdAt: -1 })
      .limit(limit)
      .exec();

    return reports.map(report => this.transformToPublicReport(report));
  }

  /**
   * Find analysis reports by user ID and status
   * @param userId - User's MongoDB ObjectId as string
   * @param status - Analysis status to filter by
   * @param limit - Maximum number of reports to return (default: 50)
   * @returns Array of analysis reports with specified status
   */
  async findByUserIdAndStatus(userId: string, status: string, limit: number = 50): Promise<IAnalysisReport[]> {
    await this.ensureConnection();
    
    const reports = await AnalysisReport
      .find({ userId, status })
      .sort({ createdAt: -1 })
      .limit(limit)
      .exec();

    return reports.map(report => this.transformToPublicReport(report));
  }

  /**
   * Update analysis report by ID
   * @param reportId - Report's MongoDB ObjectId as string
   * @param updateData - Partial report data to update
   * @returns Updated analysis report or null if not found
   */
  async updateById(reportId: string, updateData: UpdateAnalysisReportData): Promise<IAnalysisReport | null> {
    await this.ensureConnection();
    
    const updateFields: any = {};
    
    if (updateData.reportTitle !== undefined) updateFields.reportTitle = updateData.reportTitle;
    if (updateData.status !== undefined) updateFields.status = updateData.status;
    if (updateData.progress !== undefined) updateFields.progress = updateData.progress;
    if (updateData.generatedData !== undefined) updateFields.generatedData = updateData.generatedData;
    if (updateData.completedAt !== undefined) updateFields.completedAt = updateData.completedAt;

    const report = await AnalysisReport.findByIdAndUpdate(
      reportId,
      { $set: updateFields },
      { new: true, runValidators: true }
    ).exec();

    if (!report) return null;
    return this.transformToPublicReport(report);
  }

  /**
   * Delete analysis report by ID
   * @param reportId - Report's MongoDB ObjectId as string
   * @returns true if deleted, false if not found
   */
  async deleteById(reportId: string): Promise<boolean> {
    await this.ensureConnection();
    
    const result = await AnalysisReport.findByIdAndDelete(reportId).exec();
    return !!result;
  }

  /**
   * Delete all analysis reports for a user
   * @param userId - User's MongoDB ObjectId as string
   * @returns Number of reports deleted
   */
  async deleteByUserId(userId: string): Promise<number> {
    await this.ensureConnection();
    
    const result = await AnalysisReport.deleteMany({ userId }).exec();
    return result.deletedCount || 0;
  }

  /**
   * Find analysis report by upload ID
   * @param uploadId - Upload ID associated with the analysis
   * @returns Analysis report or null if not found
   */
  async findByUploadId(uploadId: string): Promise<IAnalysisReport | null> {
    await this.ensureConnection();
    
    const report = await AnalysisReport.findOne({ uploadId }).exec();
    if (!report) return null;

    return this.transformToPublicReport(report);
  }

  /**
   * Count analysis reports by user ID
   * @param userId - User's MongoDB ObjectId as string
   * @returns Number of analysis reports for the user
   */
  async countByUserId(userId: string): Promise<number> {
    await this.ensureConnection();
    
    return AnalysisReport.countDocuments({ userId }).exec();
  }

  /**
   * Count analysis reports by user ID and status
   * @param userId - User's MongoDB ObjectId as string
   * @param status - Analysis status to count
   * @returns Number of analysis reports with specified status
   */
  async countByUserIdAndStatus(userId: string, status: string): Promise<number> {
    await this.ensureConnection();
    
    return AnalysisReport.countDocuments({ userId, status }).exec();
  }

  /**
   * Find analysis reports with pagination and filtering
   * @param filters - Filter criteria for the query
   * @param options - Pagination and sorting options
   * @returns Paginated results with data and pagination info
   */
  async findPaginated(
    filters: any,
    options: { page: number; limit: number; sort?: any }
  ): Promise<{
    data: IAnalysisReport[];
    page: number;
    limit: number;
    total: number;
    pages: number;
  }> {
    await this.ensureConnection();
    
    const { page, limit, sort = { createdAt: -1 } } = options;
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      AnalysisReport.find(filters)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .exec(),
      AnalysisReport.countDocuments(filters).exec()
    ]);

    return {
      data: data.map(report => this.transformToPublicReport(report)),
      page,
      limit,
      total,
      pages: Math.ceil(total / limit)
    };
  }

  /**
   * Delete analysis report by ID with user ownership check
   * @param reportId - Report's MongoDB ObjectId as string
   * @param userId - User's MongoDB ObjectId as string for ownership verification
   * @returns true if deleted, false if not found or access denied
   */
  async deleteByIdAndUserId(reportId: string, userId: string): Promise<boolean> {
    await this.ensureConnection();
    
    const result = await AnalysisReport.findOneAndDelete({ 
      _id: reportId, 
      userId 
    }).exec();
    return !!result;
  }

  /**
   * Transform AnalysisReportDocument to public AnalysisReport interface
   * @param reportDoc - Mongoose AnalysisReportDocument
   * @returns Public analysis report data
   */
  private transformToPublicReport(reportDoc: AnalysisReportDocument): IAnalysisReport {
    return {
      _id: reportDoc._id.toString(),
      userId: reportDoc.userId,
      uploadId: reportDoc.uploadId,
      reportTitle: reportDoc.reportTitle,
      sourceDocumentCount: reportDoc.sourceDocumentCount,
      status: reportDoc.status,
      progress: reportDoc.progress,
      generatedData: reportDoc.generatedData,
      createdAt: reportDoc.createdAt,
      updatedAt: reportDoc.updatedAt,
      completedAt: reportDoc.completedAt,
    };
  }
}

/**
 * Export singleton instance for use in API routes
 * This ensures consistent database connection handling
 */
export const analysisReportRepository = new AnalysisReportRepository();
