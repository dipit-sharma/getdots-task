import React from "react";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import PersonIcon from '@mui/icons-material/Person';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import MenuIcon from '@mui/icons-material/Menu';

export const tabs = [{
    id: 'all',
    label: 'All',
    icon: undefined,
    enabled: true,
},
{
    id: 'files',
    label: 'Files',
    icon: <AttachFileIcon />,
    enabled: true,
},
{
    id: 'people',
    label: 'People',
    icon: <PersonIcon />,
    enabled: true,
},
{
    id: 'chats',
    label: 'Chats',
    icon: <ChatBubbleOutlineIcon />,
    enabled: false,
},
{
    id: 'lists',
    label: 'Lists',
    icon: <MenuIcon />,
    enabled: false,
}]