import React, { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react-pro'
import AppBreadcrumb from './AppBreadcrumb'
import Authmiddleware from './Authmiddleware'
import routes from '../routes'
import { useEffect, useRef, useContext, Fragment, useState } from 'react'
import { DataContext } from 'src/layout/DefaultLayout';

interface ItemContextType {
  getBankAccount?: () => Promise<any>;
  get_data_deposit?: () => Promise<any>;
  get_data_wit?: () => Promise<any>;
  getAllMembers?: () => Promise<any>;
  getdata_BankAccount?: () => Promise<any>;
  getallAdmins?: () => Promise<any>;
  getall_BankGrop?: () => Promise<any>;
  getBankList?: () => Promise<any>;
  getDataProfileAdmin?: () => Promise<any>;
  getdata_bankPlatforms?: () => Promise<any>;
  gegetdataMerchangs?: () => Promise<any>; // น่าจะเป็น getDataMerchants
  getDataPermissions?: () => Promise<any>;
  setSpinUpdate: (value: boolean) => void; // สมมติว่ามีฟังก์ชันนี้สำหรับ loading spinner
  setLoadding: (value: boolean) => void; // สมมติว่ามีฟังก์ชันนี้สำหรับ loading spinner
  openUpdate: boolean; // สมมติว่าเป็น boolean
  currentLocation?: string; // ใช้ useLocation แทนการเก็บใน Context หากเป็นไปได้
  itemsPerPage?: number;
  activePage?: number;
  itemsPerPageWit?: number;
  activePageWit?: number;
}
const AppContent = () => {
  const itemContext: any = useContext<ItemContextType | undefined | any>(DataContext);
  let Location: any = itemContext?.currentLocation;
  let autoUpdate: any = localStorage.getItem("autoUpdate");
  useEffect(() => {
    if (!autoUpdate) {
      localStorage.setItem("autoUpdate", "on")
    }
  }, [autoUpdate]);
  //  update All
  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([
          itemContext?.getBankAccount?.(),
          itemContext?.getDataProfileAdmin?.(),
          itemContext?.get_data_wit?.(),
          itemContext?.get_data_deposit?.(),
          itemContext?.getAllMembers?.(),
          itemContext?.getdata_BankAccount?.(),
          itemContext?.getallAdmins?.(),
          itemContext?.getall_BankGrop?.(),
          itemContext?.getBankList?.(),
          itemContext?.getdata_bankPlatforms?.(),
          itemContext?.gegetdataMerchangs?.(),
          itemContext?.getDataPermissions?.(),
        ]);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        console.log("allAppContent finally fetching data");
      }
    };
    fetchData();
  }, []);


  useEffect(() => {
    if (itemContext?.openUpdate) {
      itemContext?.setLoadding(true)
    }
    if (Location == "/bank-management/bank-accounts" || Location == "/dashboard") {
      itemContext?.getBankAccount?.();
      
    } else if (Location == "/deposit/deposit_list") {
      itemContext?.get_data_deposit?.();
    } else if (Location == "/withdrawal/withdrawal_list") {
      itemContext?.get_data_wit?.()
    } else if (Location == "/bank-statement") {
      itemContext?.getdata_BankAccount?.();
    } else if (Location == "/members") {
      itemContext?.getAllMembers?.();
    } else {
      console.log(`ไม่พบข้อมูลจาก location: ${Location}`);
    }

  }, [itemContext?.itemsPerPage, itemContext?.activePage, itemContext?.itemsPerPageWit, itemContext?.activePageWit, Location]);
  // update Withdrawal 
  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([
          itemContext?.get_data_wit?.(),
        ]);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        return
      }
    };
    const intervalId = setInterval(() => {
      fetchData?.();
    }, 1 * 60 * 1000);
    return () => clearInterval(intervalId);
  }, []);

  // update Deposit
  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([
          itemContext?.get_data_deposit?.(),
        ]);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        return
      }
    };
    const intervalId = setInterval(() => {
      fetchData?.();
    }, 1.5 * 60 * 1000);
    return () => clearInterval(intervalId);
  }, []);

  // update Members
  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([
          itemContext?.getAllMembers?.(),
        ]);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        return
      }
    };
    const intervalId = setInterval(() => {
      fetchData?.();
    }, 2 * 60 * 1000);
    return () => clearInterval(intervalId);
  }, []);




  return (
    <>
      <CContainer fluid>
        <AppBreadcrumb />
        <Suspense fallback={<CSpinner color="info" />}>
          <Routes>
            {routes.map((route, idx) => {
              return (
                route.element && <Route key={idx} path={route.path} element={<Authmiddleware><route.element /></Authmiddleware>} />
              )
            })}
            <Route path="/" element={<Navigate to="dashboard" replace />} />
          </Routes>
        </Suspense>
      </CContainer>
    </>
  )
}
export default AppContent
