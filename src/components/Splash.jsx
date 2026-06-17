import logo from "../assets/logo.png"

export const Splash = () => {
  return (
    <div className='h-screen flex flex-col overflow-hidden justify-center items-center'>
      <img className='h-20 w-20' src={logo} alt="logo" />
      <h1 className='font-bold text-3xl'>Chatly</h1>
      <p className='text-gray-500'>Simple. Fast. Connected.</p>
    </div>
  )
}

