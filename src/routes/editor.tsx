import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { toast } from '@heroui/react'
import { useEffect } from 'react'
import { AppShell } from '#/features/editor/AppShell'
import { fetchSharedLogo } from '#/queries/share/use-shared-logo'

interface SearchParams {
  s?: string
  upgraded?: string
  auth_error?: string
  error_description?: string
  error?: string
}


export const Route = createFileRoute('/editor')({
  head: () => ({
    meta: [{ title: 'SVG Logo Editor — SVGLogo.dev' }],
  }),
  validateSearch: (search: Record<string, unknown>): SearchParams => ({
    s: typeof search.s === 'string' ? search.s : undefined,
  }),
  loaderDeps: ({ search }) => ({ shareId: search.s }),
  loader: async ({ deps }) => {
    if (!deps.shareId) return { sharedLogo: null }
    const sharedLogo = await fetchSharedLogo(deps.shareId)
    return { sharedLogo }
  },
  component: EditorRoute,
})

function EditorRoute() {
  const { sharedLogo } = Route.useLoaderData()
  const { upgraded, auth_error, error_description, error } = Route.useSearch()
  const navigate = useNavigate()

  useEffect(() => {
    if (upgraded === '1') {
      navigate({ to: '/editor', search: {}, replace: true })
    }
  }, [upgraded, navigate])

  useEffect(() => {
    const msg = auth_error || error_description || error
    if (msg) {
      toast(msg.replace(/\+/g, ' '))
      navigate({ to: '/editor', search: {}, replace: true })
    }
  }, [auth_error, error_description, error, navigate])

  return (
    <AppShell
      sharedLogo={sharedLogo}
    />
  )
}
