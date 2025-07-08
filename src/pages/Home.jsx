import React from 'react'
import { TypeAnimation } from 'react-type-animation'
import Loop from '../assets/loop2.png'
import Rating from '../components/common/Rating'
import HighlightedText from '../components/common/HighlightedText'
import CodedBlocks from '../components/common/CodedBlocks'

const Home = () => {
  return (
    <div className='w-11/12 h-full'>


      <div className='w-full mt-10 flex flex-col items-center'>
        <div className='flex justify-center items-center gap-2'>
          <p className='text-[50px] font-bold text-richblack-5'>LoopOut</p>
          <div className='flex flex-col'>
            <img src={Loop} className='h-24' />
          </div>
        </div>
        <div className='ml-52'>
          <TypeAnimation
            sequence={[
              'Break the loop', 1000, ""
            ]}
            style={{ display: 'inline-block', fontSize: '16px', fontStyle: "italic" }}
            repeat={Infinity}
            omitDeletionAnimation={true}
            className='text-yellow-50'
          />
        </div>
      </div>

      <CodedBlocks
        position={"lg:flex-row"}
        heading={
          <div>
            <p className="font-bold text-richblack-25 text-4xl">Unlock your<HighlightedText text="coding potential"></HighlightedText> with our online courses.</p>
          </div>
        }
        subheading={
          "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
        }
        ctaBtn1={{
          active: true,
          link: '/signup',
          btnText: "Try it Yourself"
        }}
        ctaBtn2={{
          active: false,
          link: '/signup',
          btnText: "Learn More"
        }}
        codeBlock={
          `<!DOCTYPE html>\n<head>\n<title>This is my page</title>\n</head>\n<body>\n<a href="/">header</a>\n<nav><a href="/one">One</a>\n<a href="/two">Two</a><a href="/three">Three</a>\n</nav>\n</body>`
        }
        codeColor="text-yellow-50"
        bgGradient={
          <div className="absolute codeBlock1">

          </div>
        }
      ></CodedBlocks>

      <div className="mt-24">
        <CodedBlocks
          position={"lg:flex-row-reverse"}
          heading={
            <div>
              <p className="font-bold text-richblack-25 text-4xl">Start<HighlightedText text="coding in seconds."></HighlightedText></p>
            </div>
          }
          subheading={
            "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
          }
          ctaBtn1={{
            active: true,
            link: '/signup',
            btnText: "Continue Lesson"
          }}
          ctaBtn2={{
            active: false,
            link: '/signup',
            btnText: "Learn More"
          }}
          codeBlock={
            `import React from 'react'\nimport Button from './Button'\nimport { TypeAnimation } from 'react-type-animation'\n\nconst Home = (\n return {\n <div>Home</div>\n}\n)\n export default Home;`
          }
          codeColor="text-blue-100"
          bgGradient={
            <div className="absolute codeBlock2">

            </div>
          }
        ></CodedBlocks>
      </div>

      <Rating />

    </div>
  )
}

export default Home
