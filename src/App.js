import React, { useState, useEffect } from 'react';

// Axios
import axios from 'axios';

// Icons
import { IoMdSearch } from 'react-icons/io';
import { BsEye, BsWater, BsThermometer, BsWind } from 'react-icons/bs';
import { TbTemperatureCelsius } from 'react-icons/tb';
import { ImSpinner8 } from 'react-icons/im';

// Weathers Array
import { weathers } from './weather';

// Api Key
import { apiKey } from './config';

const App = () => {

  // States
  const [data, setData] = useState(null);
  const [location, setLocation] = useState('Paris');
  const [input, setInput] = useState('');
  const [animate, setAnimate] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [prevLocation, setPrevLocation] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    setData(null);
    setLocation(input);
    setInput("");
  };

  // Data fetching from openweathermap
  useEffect(() => {

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;

    axios.get(url).then((resp) => {
        setData(resp.data);
        setPrevLocation(location);
    }).catch((err) => {
      setErrorMsg(err);
      setLocation(prevLocation);
    });

  }, [location]);

  // Error handle
  useEffect(()=> {
    setAnimate(true);
    const timer = setTimeout(() => {
      setErrorMsg('');
      setAnimate(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [errorMsg]);


  // Icon will be set according to weather
  let icon;
  if(data !== null) icon = weathers[data.weather[0].main]; 
  

  // Date
  const date = new Date();

  return (
  <div className='w-full h-screen bg-gradientBg bg-no-repeat bg-cover bg-center flex flex-col items-center justify-center px-4 lg-px-0'>
    {errorMsg && <div className='w-full max-w-[90vw] lg:max-w-[450px] bg-[#ff208c] text-white absolute top-2 lg:top-10 p-4 capitalize rounded-md'>{`${errorMsg.response.data.message }`}</div>}
    <form onSubmit={submitHandler} className={`${animate ? 'animate-shake' : 'animate-none'} h-16 bg-black/30 w-full max-w-[450px] rounded-full backdrop-blur-[32px] mb-8`}>
      <div className='h-full flex items-center justify-between p-2'>
        <input type="text" placeholder='Search by city' value={input} onChange={(e) => setInput(e.target.value)} className='flex-1 bg-transparent outline-none placeholder:text-white text-white font-light pl-6 h-full'/>
        <button disabled={input === ""} className={`${input === "" ? "bg-[#6ddbff65]" : "bg-[#1ab8ed] hover:bg-[#15abdd]"} w-20 h-12 rounded-full flex justify-center items-center duration-150`}><IoMdSearch className='text-2xl text-white'/></button>
      </div>
    </form>
    <div className='w-full max-w-[450px] bg-black/20 min-h-[584px] text-white backdrop-blur-[32px] rounded-[32px] py-12 px-6'>
      {data === null ? ( <div className='w-full h-full flex justify-center items-center'><ImSpinner8 className='text-5xl animate-spin'/></div> ) : (
      <div>
        <div className='flex items-center gap-x-5'>
          <div className='text-[87px]'>{icon}</div>
          <div>
            <div><p className='text-2xl font-semibold'>{data.name}, {data.sys.country}</p></div>
            <div><p>{date.getUTCDate()}/{date.getUTCMonth() + 1}/{date.getUTCFullYear()}</p></div>
          </div>
        </div>

        <div className='my-20 '>
          <div className='flex justify-center items-center'>
            <div><p className='text-[144px] leading-none font-light'>{parseInt(data.main.temp)}</p></div>
            <div className='text-4xl'><TbTemperatureCelsius/></div>
          </div>
          <div className='capitalize text-center'>
            {data.weather[0].description}
          </div>
        </div>
        <div className='max-w-[378px] mx-auto flex flex-col gap-y-6'>
          <div className='flex justify-between'>
            <div className='flex items-center gap-x-2'>
              <div className='text-[20px]'><BsEye/></div>
              <div>Visibility <span className='ml-2'>{data.visibility / 1000 }km</span></div>
            </div>
            <div className='flex items-center gap-x-2'>
              <div className='text-[20px]'><BsThermometer/></div>
              <div className='flex'>Feels like <span className='ml-2 flex'>{parseInt(data.main.feels_like)} <TbTemperatureCelsius/></span></div>
            </div>
          </div>
          <div className='flex justify-between'>
            <div className='flex items-center gap-x-2'>
              <div className='text-[20px]'><BsWater/></div>
              <div>Humidity <span className='ml-2'>{data.main.humidity } %</span></div>
            </div>
            <div className='flex items-center gap-x-2'>
              <div className='text-[20px]'><BsWind/></div>
              <div className='flex'>Wind <span className='ml-2 flex'>{data.wind.speed} m/s</span></div>
            </div>
          </div>
        </div>
      </div> )}
    </div>
  </div>
  );
};

export default App;
