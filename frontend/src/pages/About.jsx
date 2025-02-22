import React from 'react'
import Title from '../component/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../component/NewsletterBox'
import Review from '../component/Review'

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={'ABOUT'} text2={'US'} />
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img src={assets.about_img} alt="" className='w-full md:max-w-[480px] rounded-lg' />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>Our specialty at Furniture Point is offering customers worldwide premium furniture and household goods. Having worked in the export sector for many years, we are dedicated to providing outstanding value, dependable service, and creative designs that satisfy our clients' various needs. Our goal is to deliver premium, long-lasting, and fashionable goods to international markets while upholding the highest standards of quality and client satisfaction. We are proud of our meticulous attention to detail, dedication to quality, and capacity to forge enduring alliances with companies across the globe. We provide goods that improve environments and endure over time. </p>
          <p>"We provide a large selection of fine furniture made to accommodate a variety of requirements and preferences. Our items are made using high-quality materials and meticulous attention to detail, guaranteeing both practicality and fashion. Our selection offers comfort and long-lasting value whether you're outfitting a house or business. We are pleased to export our goods worldwide, offering clients premium solutions for their spaces with an emphasis on superb craftsmanship and contemporary designs.</p>
          <b className="text-gray-800">Our Mission</b>
          <p>Our choice of luxurious furnishings pieces, which includes roomy almirahs and cozy couches, is made to accommodate a wide range of preferences and needs. Our items, which are made with premium components and sophisticated finishes, offer any area a perfect combination of style and utility. We provide a variety of designs that ensure comfort and long-lasting value, whether your goal is to manage your stuff with a streamlined almirah or improve your living space with a comfortable sofa. Our furniture, which is exported all over the globe, is made to the greatest standards of quality craftsmanship and design. </p>
        </div>
      </div>
      <div className="text-xl py-4">
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>
      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 hover:bg-[#b88b4a] transition-all 1s cursor-pointer hover:text-white">
          <b className=''>Quality Assurance:</b>
          <p>"A destination for superior exporting solutions where efficiency and dependability coexist." We offer smooth solutions to open up the worldwide market for you and your business.</p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 hover:bg-[#b88b4a] transition-all 1s cursor-pointer hover:text-white">
          <b className=''>Convenience:</b>
          <p>"Convenience in exporting refers to making global transactions hassle-free, ensuring smooth logistics, clear communication, and timely deliveries with minimal effort."</p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 hover:bg-[#b88b4a] transition-all 1s cursor-pointer hover:text-white">
          <b className=''>Exceptional Costomer Service:</b>
          <p>"We Deliver Satisfaction by putting your needs first. Our commitment to excellence ensures smooth and efficient export solutions every time."</p>
        </div>
      </div>
      <NewsletterBox />
      <Review />
    </div>
  )
}

export default About