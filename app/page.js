import Link from "next/link"


const HomePage = () => {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-6xl text-primary font-bold">Aditya AI Assitant</h1>
          <p className="py-6 text-lg leading-loose">An intelligent AI assistant built by Aditya Gupta, designed to help you with tasks, answer questions, and provide insights effortlessly. Experience seamless interactions powered by advanced AI capabilities.</p>
          <Link href={'/chat'} className="btn btn-secondary">Get Started </Link>
        </div>
      </div>
    </div>
  )
}

export default HomePage
