import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Header } from './header'

const mockUseUser = vi.fn()
const mockLogout = vi.fn()
const mockSetTheme = vi.fn()

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn(), prefetch: vi.fn() }),
  usePathname: () => '/',
}))

vi.mock('next-themes', () => ({
  useTheme: () => ({ theme: 'dark', setTheme: mockSetTheme }),
}))

vi.mock('@/lib/hooks', () => ({
  useUser: () => mockUseUser(),
  useLogout: () => ({ logout: mockLogout, isLoading: false }),
}))

describe('Header', () => {
  it('renders navigation links', () => {
    mockUseUser.mockReturnValue({ data: null, isLoading: false })
    render(<Header />)
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Events')).toBeInTheDocument()
  })

  it('shows sign in and get started when not authenticated', () => {
    mockUseUser.mockReturnValue({ data: null, isLoading: false })
    render(<Header />)
    expect(screen.getByText('Sign in')).toBeInTheDocument()
    expect(screen.getByText('Get started')).toBeInTheDocument()
  })

  it('shows user avatar and sign out when authenticated', () => {
    mockUseUser.mockReturnValue({ data: { id: 1, name: 'Sensei' }, isLoading: false })
    render(<Header />)
    expect(screen.getByText('Sensei')).toBeInTheDocument()
    expect(screen.getByText('Sign out')).toBeInTheDocument()
  })

  it('shows loading skeleton when user is loading', () => {
    mockUseUser.mockReturnValue({ data: null, isLoading: true })
    const { container } = render(<Header />)
    const skeleton = container.querySelector('.animate-pulse')
    expect(skeleton).toBeInTheDocument()
  })

  it('toggles mobile menu', () => {
    mockUseUser.mockReturnValue({ data: null, isLoading: false })
    render(<Header />)
    const toggle = screen.getByLabelText('Toggle menu')
    fireEvent.click(toggle)
    const navLinks = screen.getAllByText('Events')
    expect(navLinks).toHaveLength(2)
  })

  it('renders theme toggle button', () => {
    mockUseUser.mockReturnValue({ data: null, isLoading: false })
    render(<Header />)
    expect(screen.getByLabelText('Toggle theme')).toBeInTheDocument()
  })

  it('calls setTheme when toggle is clicked', () => {
    mockUseUser.mockReturnValue({ data: null, isLoading: false })
    render(<Header />)
    fireEvent.click(screen.getByLabelText('Toggle theme'))
    expect(mockSetTheme).toHaveBeenCalledWith('light')
  })
})
