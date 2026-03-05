import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  const admin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  )

  // Get access token from Authorization header
  const authHeader = request.headers.get('Authorization')
  if (!authHeader?.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }
  const accessToken = authHeader.slice(7)

  // Verify the token and get user
  const { data: { user }, error: userError } = await admin.auth.getUser(accessToken)
  if (userError || !user) {
    return NextResponse.json({ error: 'Invalid token: ' + userError?.message }, { status: 401 })
  }

  // Delete from users table and auth
  const { error: tableError } = await admin.from('users').delete().eq('id', user.id)
  if (tableError) console.error('Table delete error:', tableError)

  const { error } = await admin.auth.admin.deleteUser(user.id)
  if (error) {
    return NextResponse.json({ error: 'Auth delete error: ' + error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
