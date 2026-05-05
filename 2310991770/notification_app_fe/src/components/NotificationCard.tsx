'use client';

import React, { useEffect } from 'react';
import { Box, Paper, Typography, Chip, Tooltip } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import AssessmentIcon from '@mui/icons-material/Assessment';
import WorkIcon from '@mui/icons-material/Work';
import StarIcon from '@mui/icons-material/Star';
import FiberNewIcon from '@mui/icons-material/FiberNew';
import { Notification, WEIGHT } from '@/lib/api';
import { Log } from '../../../logging_middleware/logger';

interface Props {
  notification: Notification;
  isNew?: boolean;
  isPriority?: boolean;
}

const TYPE_CONFIG = {
  Event:     { color: '#4ecdc4', bg: 'rgba(78,205,196,0.1)',   border: 'rgba(78,205,196,0.25)',   icon: <EventIcon sx={{fontSize:20}}/>,      label: 'Event' },
  Result:    { color: '#ffd166', bg: 'rgba(255,209,102,0.1)',  border: 'rgba(255,209,102,0.25)',  icon: <AssessmentIcon sx={{fontSize:20}}/>, label: 'Result' },
  Placement: { color: '#ff6b9d', bg: 'rgba(255,107,157,0.1)', border: 'rgba(255,107,157,0.25)', icon: <WorkIcon sx={{fontSize:20}}/>,       label: 'Placement' },
};

function formatTime(ts: string): string {
  const d = new Date(ts);
  const diff = Date.now() - d.getTime();
  if (diff < 60000) return 'just now';
  if (diff < 3600000) return `${Math.floor(diff/60000)}m ago`;
  if (diff < 86400000) return `${Math.floor(diff/3600000)}h ago`;
  return d.toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' });
}

export default function NotificationCard({ notification, isNew, isPriority }: Props) {
  const cfg = TYPE_CONFIG[notification.Type] || TYPE_CONFIG.Event;
  const weight = WEIGHT[notification.Type] ?? 0;

  useEffect(() => {
    Log('debug', 'component', `NotificationCard rendered: ${notification.ID} [${notification.Type}]`);
  }, [notification.ID, notification.Type]);

  return (
    <Paper elevation={0} sx={{
      display:'flex', gap:1.5, p:'14px 16px',
      borderRadius:'12px', border:'1px solid',
      borderColor: isNew ? cfg.border : 'divider',
      bgcolor:'#161620', position:'relative', overflow:'hidden',
      transition:'all 0.18s ease', cursor:'default',
      '&:hover':{ borderColor:'rgba(124,111,255,0.4)', bgcolor:'#1a1a26', transform:'translateY(-1px)' },
      '&::before': isNew ? {
        content:'""', position:'absolute', left:0, top:0, bottom:0,
        width:'3px', borderRadius:'3px 0 0 3px', bgcolor:cfg.color,
      } : {},
    }}>
      <Box sx={{
        width:40, height:40, borderRadius:'10px', flexShrink:0,
        display:'flex', alignItems:'center', justifyContent:'center',
        bgcolor:cfg.bg, border:`1px solid ${cfg.border}`, color:cfg.color,
      }}>
        {cfg.icon}
      </Box>

      <Box sx={{flex:1, minWidth:0}}>
        <Box sx={{display:'flex', alignItems:'center', gap:0.75, mb:0.4, flexWrap:'wrap'}}>
          <Chip label={cfg.label} size="small" sx={{
            fontSize:'0.63rem', fontWeight:600, height:20, letterSpacing:'0.06em',
            bgcolor:cfg.bg, color:cfg.color, border:`1px solid ${cfg.border}`,
          }}/>
          {isPriority && Array.from({length:weight}).map((_,i)=>(
            <StarIcon key={i} sx={{fontSize:12, color:'#ffd166', opacity:0.85}}/>
          ))}
          {isNew && <Tooltip title="New"><FiberNewIcon sx={{fontSize:16, color:'#7c6fff', ml:'auto'}}/></Tooltip>}
          {!isNew && <Box sx={{ml:'auto'}}/>}
          <Typography variant="caption" sx={{color:'text.secondary', fontSize:'0.73rem'}}>
            {formatTime(notification.Timestamp)}
          </Typography>
        </Box>
        <Typography variant="body2" sx={{
          color:'text.primary', fontSize:'0.92rem', textTransform:'capitalize',
          whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis',
        }}>
          {notification.Message}
        </Typography>
        <Typography variant="caption" sx={{color:'text.secondary', fontSize:'0.72rem'}}>
          {new Date(notification.Timestamp).toLocaleString('en-IN')}
        </Typography>
      </Box>
    </Paper>
  );
}
