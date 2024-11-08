import AuthForm from '@/components/AuthForm'
import OutlinedAlerts from '@/components/ui/Alert'

const SignIn = () => {
  return (
    <section className='flex-center max-sm:px-6 size-full relative'>
      
      <OutlinedAlerts/>
      <AuthForm type='sign-in'/>
    </section>
  )
}

export default SignIn