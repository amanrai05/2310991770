'use client';

import React from 'react';
import { Box, Typography } from '@mui/material';

interface Props {
  counts: { Event:number; Result:number; Placement:number; total:number };
}

const STATS = [
  { key:'total',     label:'Total',      color:'#7c6fff' },
  { key:'Placement', label:'Placements', color:'#ff6b9d' },
  { key:'Result',    label:'Results',    color:'#ffd166' },
  { key:'Event',     label:'Events',     color:'#4ecdc4' },
];

export default function StatsBar({ counts }: Props) {
  return (
    <Box sx={{display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:1.5, mb:1}}>
      {STATS.map(s => (
        <Box key={s.key} sx={{bgcolor:'#161620', border:'1px solid #2a2a3a', borderRadius:'10px', p:'12px 16px'}}>
          <Typography sx={{fontSize:'0.68rem', color:'text.secondary', textTransform:'uppercase', letterSpacing:'0.08em', mb:0.3}}>
            {s.label}
          </Typography>
          <Typography sx={{fontFamily:'Syne, sans-serif', fontWeight:600, fontSize:'1.5rem', color:s.color}}>
            {counts[s.key as keyof typeof counts] ?? 0}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}
