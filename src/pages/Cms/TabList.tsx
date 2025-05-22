import React, { Fragment } from 'react';
import { Tab } from '@headlessui/react';
import IconHome from '../../components/Icon/IconHome';
import IconUser from '../../components/Icon/IconUser';
import IconPhone from '../../components/Icon/IconPhone';
import IconInfoCircle from '../../components/Icon/IconInfoCircle';

const TabList = () => {
  return (
    <Tab.List className="mt-3 mr-3 flex flex-wrap border-b border-white-light dark:border-[#191e3a]">
      <Tab as={Fragment}>
        {({ selected }) => (
          <button
            className={`${
              selected ? '!border-white-light !border-b-white text-danger !outline-none dark:!border-[#191e3a] dark:!border-b-black' : ''
            } dark:hover:border-b-black -mb-[1px] flex items-center border border-transparent p-3.5 py-2 hover:text-danger`}
          >
            <IconHome className="ltr:mr-2 rtl:ml-2" />
            Home
          </button>
        )}
      </Tab>
      <Tab as={Fragment}>
        {({ selected }) => (
          <button
            className={`${
              selected ? '!border-white-light !border-b-white text-danger !outline-none dark:!border-[#191e3a] dark:!border-b-black' : ''
            } dark:hover:border-b-black -mb-[1px] flex items-center border border-transparent p-3.5 py-2 hover:text-danger`}
          >
            <IconUser className="w-5 h-5 ltr:mr-2 rtl:ml-2" />
            Profile
          </button>
        )}
      </Tab>
      <Tab as={Fragment}>
        {({ selected }) => (
          <button
            className={`${
              selected ? '!border-white-light !border-b-white text-danger !outline-none dark:!border-[#191e3a] dark:!border-b-black' : ''
            } dark:hover:border-b-black -mb-[1px] flex items-center border border-transparent p-3.5 py-2 hover:text-danger`}
          >
            <IconPhone className="ltr:mr-2 rtl:ml-2" />
            Contact
          </button>
        )}
      </Tab>
      <Tab className="pointer-events-none -mb-[1px] flex items-center p-3.5 py-2 text-white-light dark:text-dark">
        <IconInfoCircle className="w-5 h-5 ltr:mr-2 rtl:ml-2" />
        Disabled
      </Tab>
    </Tab.List>
  );
};

export default TabList;
