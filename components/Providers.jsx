import { ClerkProvider } from '@clerk/nextjs'

function Providers({children}) {
  return (
    <ClerkProvider>
        {children}
    </ClerkProvider>
  )
}

export default Providers