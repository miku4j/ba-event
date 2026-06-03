import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { EventGrid } from './event-grid'

const mockEvents = [
  { id: 1, title: 'Event 1', description: 'Desc 1', location: 'Loc 1', starts_at: '2026-06-10T18:00:00Z', capacity: 50, rsvps_count: 10 },
  { id: 2, title: 'Event 2', description: 'Desc 2', location: 'Loc 2', starts_at: '2026-06-11T18:00:00Z', capacity: 30, rsvps_count: 5 },
]

describe('EventGrid', () => {
  it('renders events', () => {
    render(<EventGrid events={mockEvents} />)
    expect(screen.getByText('Event 1')).toBeInTheDocument()
    expect(screen.getByText('Event 2')).toBeInTheDocument()
  })
})
