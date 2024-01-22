
import { Sidebar } from 'flowbite-react';
import {  HiChartPie, HiInbox,  HiOutlineCloudUpload } from 'react-icons/hi';
// import img from '../../src/assets/awardbooks.png'

// import { useContext, useEffect, useState } from 'react';

// import Navbar from '../pages/shared/Navbar';
// import axios from 'axios';
// import { useQuery } from '@tanstack/react-query';
// import { AuthContext } from '../contexts/AuthProvider';

const SideBar = () => {

//   const [role,setRole]=useState("");
//  const{user}=useContext(AuthContext)
//   const getUsers= async()=>{
// const res=await axios.get("https://assignment-12-server-two-smoky.vercel.app/users")
// return res;
//   }
  

//   const {data,isLoading}=useQuery({
//     queryKey:["users"],
//     queryFn:getUsers
//   })

//   useEffect(()=>{
//  const seeUsers=data?.data?.filter(check=>check.email==user?.email)
//  const userType=seeUsers?.map(items=>setRole(items.role))

//   },[data,user])

//   if(isLoading){
//     return <h2>loading.....</h2>
//   }

//   console.log(user?.email,role)

  return (
    <div className=''>

      <Sidebar aria-label="Sidebar with content separator example" className=' mt-4 '>
        {/* <Sidebar.Logo
          href="/"
          //img={img}
          className='w-10 h-10 rounded-full'
          imgAlt="Flowbite logo"
        >
          <p>
            {user?.displayName || "Demo User" }
          </p>
        </Sidebar.Logo> */}
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item
              href=""
              icon={HiChartPie}>
              <p>
                Dashboard
              </p>
            </Sidebar.Item>
            <Sidebar.Item
              href=""
              icon={HiOutlineCloudUpload}
            >
              <p>
                Home 
              </p>
            </Sidebar.Item>

            <Sidebar.Item
              href=""
              icon={HiOutlineCloudUpload}
            >
              <p>
                Virtual Meeting
              </p>
            </Sidebar.Item>

            <Sidebar.Item
              href=""
              icon={HiInbox}
            >
              <p>
              Progress Report
              </p>
            </Sidebar.Item>


            
            
           

{/* 
            <Sidebar.Item
              href="/admin/dashboard/adoption"
              icon={HiInbox}
            >
              <p>
               Adoption Request
              </p>
            </Sidebar.Item>
            
            
        {

            role==="admin" && <>
          <Sidebar.Item
              href="/admin/dashboard/users"
              icon={HiUser}
            >
              <p>
             Users
              </p>
            </Sidebar.Item>
          
            <Sidebar.Item
              href="/admin/dashboard/alldonations"
              icon={ HiSupport}
            >
              <p>
             All Donations
              </p>
            </Sidebar.Item>

            <Sidebar.Item
              href="/admin/dashboard/allpets"
              icon={ HiSupport}
            >
              <p>
              All Pets
              </p>
            </Sidebar.Item>
          </>
        }

         
      
           
            <Sidebar.Item
              href="/logout"
              icon={HiTable}
            >
              <p>
                Log out
              </p>
            </Sidebar.Item> */}
          </Sidebar.ItemGroup>
          <Sidebar.ItemGroup>
           
           
           
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
     
    </div>
  )
}

export default SideBar