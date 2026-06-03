import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { FeaturedEvent } from './featured-event'

const mockEvent = {
  id: 1,
  title: 'Test Event',
  description: 'A test event description.',
  location: 'Test Location',
  starts_at: '2026-06-10T18:00:00Z',
  capacity: 50,
  rsvps_count: 10,
}

describe('FeaturedEvent', () => {
  it('renders event details', () => {
    render(<FeaturedEvent featured={mockEvent} user={null} />)
    expect(screen.getByText(mockEvent.title)).toBeInTheDocument()
    const locations = screen.getAllByText(mockEvent.location)
    expect(locations.length).toBeGreaterThanOrEqual(1)
    expect(screen.getByText(/10 \/ 50 Students/)).toBeInTheDocument()
  })

  it('shows Sign in to RSVP when not authenticated', () => {
    render(<FeaturedEvent featured={mockEvent} user={null} />)
    expect(screen.getByText('Sign in to RSVP')).toBeInTheDocument()
  })

  it('shows RSVP when authenticated', () => {
    render(<FeaturedEvent featured={mockEvent} user={{ id: 1, name: 'Sensei' }} />)
    expect(screen.getByText('RSVP')).toBeInTheDocument()
  })

  it('shows loading skeleton while loading', () => {
    const { container } = render(<FeaturedEvent featured={null} user={null} isLoading={true} />)
    const skeleton = container.querySelector('.animate-pulse')
    expect(skeleton).toBeInTheDocument()
  })

  it('renders nothing when no featured event and not loading', () => {
    const { container } = render(<FeaturedEvent featured={null} user={null} isLoading={false} />)
    expect(container.querySelector('.rounded-2xl')).not.toBeInTheDocument()
  })
})
