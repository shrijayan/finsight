import { render, screen } from '@testing-library/react'
import HomePage from './page'

describe('HomePage', () => {
  it('renders the application title', () => {
    render(<HomePage />)
    const titleElement = screen.getByRole('heading', { name: /bank statement analyzer/i })
    expect(titleElement).toBeInTheDocument()
  })

  it('displays the application description', () => {
    render(<HomePage />)
    const description = screen.getByText(/upload and analyze your bank statements with ease/i)
    expect(description).toBeInTheDocument()
  })

  it('shows a placeholder file upload interface', () => {
    render(<HomePage />)
    const uploadButton = screen.getByRole('button', { name: /upload bank statement file \(coming soon\)/i })
    expect(uploadButton).toBeInTheDocument()
    expect(uploadButton).toBeDisabled()
  })

  it('displays feature preview sections', () => {
    render(<HomePage />)
    const smartCategorizationFeature = screen.getByText(/smart categorization/i)
    const visualReportsFeature = screen.getByText(/visual reports/i)
    
    expect(smartCategorizationFeature).toBeInTheDocument()
    expect(visualReportsFeature).toBeInTheDocument()
  })

  it('has proper accessibility attributes', () => {
    const { container } = render(<HomePage />)
    const uploadButton = screen.getByRole('button')
    expect(uploadButton).toHaveAttribute('aria-label')
    
    // Query SVG elements directly since they have aria-hidden="true"
    const svgElements = container.querySelectorAll('svg[aria-hidden="true"]')
    
    svgElements.forEach(svg => {
      expect(svg).toHaveAttribute('aria-hidden', 'true')
    })
    
    // Ensure we found some SVG elements
    expect(svgElements.length).toBeGreaterThan(0)
  })

  it('is responsive with proper CSS classes', () => {
    render(<HomePage />)
    const mainContainer = screen.getByText(/bank statement analyzer/i).closest('div')
    expect(mainContainer).toHaveClass('space-y-4')
    
    const featureGrid = screen.getByText(/smart categorization/i).closest('.grid')
    expect(featureGrid).toHaveClass('sm:grid-cols-2')
  })
})
