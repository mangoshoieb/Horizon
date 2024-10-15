import AuthForm from '@/components/AuthForm'

const SignUP = async() => {
  return (
    <section className='flex-center max-sm:px-6 size-full'>
      <AuthForm type='sign-up'/>
    </section>
  )
}

export default SignUP