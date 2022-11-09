import { IoMdSunny, IoMdRainy, IoMdCloudy, IoMdSnow, IoMdThunderstorm } from 'react-icons/io';
import { BsCloudHaze2Fill, BsCloudDrizzleFill } from 'react-icons/bs';

export const weathers = {
  "Clouds": <IoMdCloudy/>,
  "Haze": <BsCloudHaze2Fill/>,
  "Rain": <IoMdRainy className='text-[#31cafb]'/>,
  "Clear": <IoMdSunny className='text-[#ffde33]'/>,
  "Snow": <IoMdSnow className='text-[#31cafb]'/>,
  "Drizzle": <BsCloudDrizzleFill className='text-[#31cafb]'/>,
  "ThunderStorm": <IoMdThunderstorm/>
};

