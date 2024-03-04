import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';

export const SidebarData = [
    {
        title: 'Dashboard',
        path: '/overview',
        icon: <AiIcons.AiFillHome />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,

        subNav: [
            {
                title: 'Users',
                path: '/overview/users',
                icon: <IoIcons.IoIosPaper />
            },
            {
                title: 'Revenue',
                path: '/overview/revenue',
                icon: <IoIcons.IoIosPaper />
            }
        ]
    },
    {
        title: 'Monitor',
        path: '/reviews-feed',
        icon: <IoIcons.IoIosPaper />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,

        subNav: [
            {
                title: 'Rating chart',
                path: '/reports/reports1',
                icon: <IoIcons.IoIosPaper />,
                cName: 'sub-nav'
            },
            {
                title: 'Reviews chart',
                path: '/reports/reports2',
                icon: <IoIcons.IoIosPaper />,
                cName: 'sub-nav'
            },
            {
                title: 'Reviews analysis',
                path: '/reports/reports3',
                icon: <IoIcons.IoIosPaper />
            },
            {
                title: 'Reviews feed',
                path: '/reports/reports3',
                icon: <IoIcons.IoIosPaper />
            }
        ]
    },
    {
        title: 'Engage',
        path: '/products',
        icon: <FaIcons.FaCartPlus />
    },
    {
        title: 'Accelerate',
        path: '/messages',
        icon: <FaIcons.FaEnvelopeOpenText />,

        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,

        subNav: [
            {
                title: 'Message 1',
                path: '/messages/message1',
                icon: <IoIcons.IoIosPaper />
            },
            {
                title: 'Message 2',
                path: '/messages/message2',
                icon: <IoIcons.IoIosPaper />
            }
        ]
    },
    {
        title: 'Integrations',
        path: '/support',
        icon: <IoIcons.IoMdHelpCircle />
    }
];
