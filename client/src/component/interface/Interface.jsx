import {motion}from "framer-motion" 
const Section=(props)=>{

    const { children} = props
    return (<section className='h-screen w-screeen max-w-screen-2xl flex mx-16 p-8
    flex-col items-start justify-center font-sans'>{children}</section>)
}
const About=()=>{
  return (  <Section>
  <motion.div initial={{opacity:0,x:50}} whileInView={{opacity:1,x:0,transition:{duration:2,delay:.5}}}>
 
      <h1 className="text-6xl leading-snug">
      <p>Hi,I am</p>
      <span className="italic text-white font-serif">Rahul Shah</span><br/>
      <span className="text-[#212121] ">Enthusiastic developer</span>
      </h1>
      <button className="bg-indigo-600 py-4 px-4 mt-6 text-white rounded-lg">Contact me</button>

    </motion.div>
    </Section>)
}


const skills=[{title:"html",rating:80},{title:"css",rating:40},{title:"tailwind",rating:80},{title:"three-fiber",rating:20}]
const Skills=()=>{
  return( 
  <Section>
    <motion.div className="text-4xl  mx-24 font-semibold font-serif">
      <h1>Skills</h1>
      <div className="text-2xl mt-8 w-[15rem]">
        {skills.map((item,index)=> {
        return(<div className="my-4"  key={index}>
        <p>{item.title.toLocaleUpperCase()}</p>
          <div className=' h-[.5rem] bg-indigo-100 my-2 rounded-lg w-full' >
            <motion.div className=' h-[.5rem] bg-indigo-500 my-2 rounded-lg'   
            initial={{opacity:0,width:0}} whileInView={{opacity:1,width:`${item.rating}%`,transition:{duration:2,delay:.5}}}></motion.div>
          </div>
        </div>)})}
      </div>
    </motion.div>
  </Section>
  )}

const Contact=()=>{
return (<Section>
  <div className="mx-auto flex flex-col justify-center">
<h1 className="font-semibold  text-zinc-600 text-opacity-60 text-5xl my-6 mx-auto flex flex-col justify-center">Contact me</h1>
<form className="rounded-lg drop-shadow-2xl  shadow-[0px_15px_30px_1px_rgba(0,0,0,0.3)] p-4 bg-blend-multiply text-3xl font-thin ">
  <div className="my-4">
    <label for="name">Name: </label>
    <input type="text" name="name" className="px-2  rounded-sm bg-transparent focus:ring-2 focus:outline-none"  style={{backfaceVisibility:0,}}></input>
  </div>
  <div  className="my-4">
    <label for="email">Email:</label>
    <input type="email" name="email"  className="px-2 rounded-sm bg-transparent focus:ring-2 focus:outline-none"   ></input>
  </div>
  <div  className="my-4">
    <label for="number">Number: </label>
    <input type="number"  name="number" className="px-2 rounded-sm bg-transparent focus:ring-2 focus:outline-none"   ></input>
  </div>
  <div  className="my-4 flex flex-row">
    <label for="message">Message: </label>
    <textarea
     type="textarea" rows="4" cols="50"  name="message" className="px-2 rounded-sm bg-transparent focus:ring-2 focus:outline-none"   ></textarea>
  </div>
</form></div>
</Section>)
}  
export const Interface=()=> {
  return (
    <div className="flex flex-col  w-screen">
      <About/>
      <Skills/>
      <Section><h1>Projects</h1></Section>
      <Contact/>
    </div>
  )
}
