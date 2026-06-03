import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { EventCard } from './event-card'

const mockEvent = {
  id: 1,
  title: 'After-School Sweets Club Live',
  description: 'A special live performance.',
  location: 'Trinity Auditorium',
  starts_at: '2026-06-10T18:00:00Z',
  capacity: 50,
  rsvps_count: 10,
}

describe('EventCard', () => {
  it('renders event details correctly', () => {
    render(<EventCard event={mockEvent} />)
    
    expect(screen.getByText(mockEvent.title)).toBeInTheDocument()
    expect(screen.getByText(mockEvent.location)).toBeInTheDocument()
    expect(screen.getByText(/10 \/ 50 Students/)).toBeInTheDocument()
  })

  it('shows FULL badge when capacity is reached', () => {
    const fullEvent = { ...mockEvent, rsvps_count: 50 }
    render(<EventCard event={fullEvent} />)
    
    expect(screen.getByText('FULL')).toBeInTheDocument()
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
    expect(button).toHaveTextContent('Event Full')
  })

  it('calls onRSVP when button is clicked', () => {
    const onRSVP = vi.fn()
    render(<EventCard event={mockEvent} onRSVP={onRSVP} />)
    
    const button = screen.getByRole('button', { name: /RSVP/i })
    fireEvent.click(button)
    
    expect(onRSVP).toHaveBeenCalledWith(mockEvent.id)
  })

  it('shows loading state on button', () => {
    render(<EventCard event={mockEvent} isLoading={true} />)
    
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
    expect(button).toHaveTextContent('Processing...')
  })

  it('shows Cancel RSVP when already RSVPed', () => {
    render(<EventCard event={mockEvent} isRSVPed={true} />)
    
    expect(screen.getByRole('button', { name: /Cancel RSVP/i })).toBeInTheDocument()
  })
})
