'use client';

import React from 'react';
import { Box, Typography, Button, Divider } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import AssessmentIcon from '@mui/icons-material/Assessment';
import WorkIcon from '@mui/icons-material/Work';
import InboxIcon from '@mui/icons-material/Inbox';
import StarIcon from '@mui/icons-material/Star';
import NotificationsIcon from '@mui/icons-material/Notifications';

interface Props {
  activeView: string;
  counts: Record<string, number>;
  onViewChange: (view: string) => void;
}

const NAV = [
  { key:'all',       label:'All Notifications', icon:<InboxIcon sx={{fontSize:18}}/>,       color:'#7c6fff' },
  { key:'priority',  label:'Priority Inbox',     icon:<StarIcon sx={{fontSize:18}}/>,        color:'#ffd166' },
];
const TYPES = [
  { key:'Event',     label:'Events',     icon:<EventIcon sx={{fontSize:18}}/>,      color:'#4ecdc4' },
  { key:'Result',    label:'Results',    icon:<AssessmentIcon sx={{fontSize:18}}/>, color:'#ffd166' },
  { key:'Placement', label:'Placements', icon:<WorkIcon sx={{fontSize:18}}/>,       color:'#ff6b9d' },
];

export default function Sidebar({ activeView, counts, onViewChange }: Props) {
  const NavBtn = ({ k, label, icon, color }: { k:string; label:string; icon:React.ReactNode; color:string }) => {
    const active = activeView === k;
    return (
      <Button fullWidth onClick={() => onViewChange(k)}
        startIcon={<Box sx={{color: active ? color : 'text.secondary'}}>{icon}</Box>}
        sx={{
          justifyContent:'flex-start', px:1.5, py:0.8, borderRadius:'8px',
          color: active ? color : 'text.secondary',
          bgcolor: active ? `${color}18` : 'transparent',
          border: active ? `1px solid ${color}40` : '1px solid transparent',
          fontWeight: active ? 500 : 400, fontSize:'0.86rem',
          '&:hover':{ bgcolor:`${color}15`, color },
        }}
      >
        <Box sx={{flex:1, textAlign:'left'}}>{label}</Box>
        {counts[k] !== undefined && (
          <Box sx={{fontSize:'0.68rem', bgcolor:'#2a2a3a', color:'text.secondary', px:0.8, borderRadius:'20px', minWidth:24, textAlign:'center'}}>
            {counts[k]}
          </Box>
        )}
      </Button>
    );
  };

  return (
    <Box sx={{
      width:260, flexShrink:0, bgcolor:'#111118',
      borderRight:'1px solid #2a2a3a', display:'flex', flexDirection:'column',
      gap:2, p:2, height:'100vh', position:'sticky', top:0,
    }}>
      <Box sx={{display:'flex', alignItems:'center', gap:1, px:1.5, py:1, borderRadius:'10px', bgcolor:'rgba(124,111,255,0.08)', border:'1px solid rgba(124,111,255,0.2)'}}>
        <NotificationsIcon sx={{color:'#7c6fff', fontSize:20}}/>
        <Typography sx={{fontFamily:'Syne, sans-serif', fontWeight:700, fontSize:'1rem'}}>
          AFFORD<span style={{color:'#7c6fff'}}>MED</span>
        </Typography>
        <Typography sx={{fontSize:'0.75rem', color:'text.secondary', ml:0.5}}>notify</Typography>
      </Box>

      <Box>
        <Typography sx={{fontSize:'0.63rem', color:'text.secondary', letterSpacing:'0.12em', textTransform:'uppercase', px:1.5, mb:0.75}}>Inbox</Typography>
        <Box sx={{display:'flex', flexDirection:'column', gap:0.5}}>
          {NAV.map(n => <NavBtn key={n.key} k={n.key} label={n.label} icon={n.icon} color={n.color}/>)}
        </Box>
      </Box>

      <Divider sx={{borderColor:'#2a2a3a'}}/>

      <Box>
        <Typography sx={{fontSize:'0.63rem', color:'text.secondary', letterSpacing:'0.12em', textTransform:'uppercase', px:1.5, mb:0.75}}>By Type</Typography>
        <Box sx={{display:'flex', flexDirection:'column', gap:0.5}}>
          {TYPES.map(t => <NavBtn key={t.key} k={t.key} label={t.label} icon={t.icon} color={t.color}/>)}
        </Box>
      </Box>

      <Box sx={{mt:'auto', px:1.5, py:1, bgcolor:'#0d0d14', borderRadius:'8px', border:'1px solid #2a2a3a'}}>
        <Typography sx={{fontSize:'0.68rem', color:'text.secondary', fontWeight:500, mb:0.75}}>Priority Formula</Typography>
        {[{e:'🏆',l:'Placement',s:'★★★'},{e:'📊',l:'Result',s:'★★'},{e:'📅',l:'Event',s:'★'}].map(r=>(
          <Box key={r.l} sx={{display:'flex', alignItems:'center', gap:0.75, mb:0.4}}>
            <Typography sx={{fontSize:'0.7rem'}}>{r.e}</Typography>
            <Typography sx={{fontSize:'0.72rem', color:'text.secondary', flex:1}}>{r.l}</Typography>
            <Typography sx={{fontSize:'0.65rem', color:'#ffd166'}}>{r.s}</Typography>
          </Box>
        ))}
        <Typography sx={{fontSize:'0.65rem', color:'#3a3a50', mt:0.5}}>+ recency tiebreaker</Typography>
      </Box>
    </Box>
  );
}
