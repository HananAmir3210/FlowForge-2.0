# High-Quality 3D Graphics Setup Guide

This guide explains how to set up the premium 3D graphics and videos for the AI SOP Generator landing page.

## Overview

The landing page now features 4 high-quality dynamic 3D graphics:

1. **Hero Section** - Spline 3D scene with AI automation visualization
2. **Features Section** - Spline 3D scene with workflow visualization  
3. **How It Works Section** - Premium WebM video with process demonstration
4. **AI In Action Section** - Premium WebM video with real-time AI processing

## Brand Colors

The graphics use the following brand colors:
- **Deep Blue**: `#003366`
- **Soft Green**: `#66CC99`

## 1. Spline 3D Scenes Setup

### Hero Section Scene
- **URL**: `https://prod.spline.design/ai-automation-hero/scene.splinecode`
- **Theme**: AI automation with floating elements and data flow
- **Colors**: Deep blue (#003366) to soft green (#66CC99) gradient
- **Animation**: Subtle floating motion, interactive hover effects
- **Elements**: 3D geometric shapes, flowing data particles, glowing effects

### Features Section Scene  
- **URL**: `https://prod.spline.design/workflow-features/scene.splinecode`
- **Theme**: Workflow automation with interconnected nodes
- **Colors**: Brand blue and green with white accents
- **Animation**: Flowing connections between workflow nodes
- **Elements**: 3D workflow nodes, connecting lines, data streams

### Creating Spline Scenes

1. **Visit Spline.design** and create a new project
2. **Design your 3D scene** using the brand colors
3. **Add interactive elements** with subtle animations
4. **Export the scene** and get the public URL
5. **Update the URLs** in `src/pages/Index.tsx`

### Spline Scene Requirements

- **Performance**: Optimized for web (under 5MB)
- **Responsive**: Works on desktop and mobile
- **Interactive**: Subtle hover effects and animations
- **Branding**: Uses the specified brand colors
- **Loading**: Graceful fallback to Lottie animations

## 2. WebM Video Setup

### How It Works Video
- **File**: `/public/videos/how-it-works-process.webm`
- **Duration**: 15-30 seconds
- **Quality**: 1080p or higher
- **Content**: Step-by-step process visualization
- **Style**: Minimal, futuristic, premium aesthetic

### AI In Action Video
- **File**: `/public/videos/ai-in-action-demo.webm`
- **Duration**: 20-40 seconds
- **Quality**: 1080p or higher
- **Content**: Real-time AI processing demonstration
- **Style**: Dynamic, glowing effects, data transformation

### Video Requirements

- **Format**: WebM (primary) with MP4 fallback
- **Compression**: Optimized for web streaming
- **Loop**: Seamless looping
- **Colors**: Brand blue and green palette
- **Style**: Minimal, futuristic, premium
- **Performance**: Fast loading, smooth playback

### Creating WebM Videos

1. **Use After Effects, Blender, or similar** to create the animations
2. **Apply brand colors** (#003366 and #66CC99)
3. **Export as WebM** with VP9 codec
4. **Create MP4 fallback** for broader compatibility
5. **Place in `/public/videos/`** directory

## 3. Fallback System

The application includes a robust fallback system:

### Spline Scenes
- **Primary**: Spline 3D scene
- **Fallback**: Premium Lottie animation
- **Loading**: Smooth loading animation

### WebM Videos
- **Primary**: WebM video
- **Fallback**: MP4 video
- **Final Fallback**: Premium Lottie animation

## 4. Performance Optimization

### Spline Optimization
- Use low-poly models when possible
- Optimize textures and materials
- Limit particle effects
- Test on various devices

### Video Optimization
- Compress videos appropriately
- Use WebM format for smaller file sizes
- Provide multiple quality options
- Implement lazy loading

## 5. Testing Checklist

- [ ] Spline scenes load correctly
- [ ] WebM videos play smoothly
- [ ] Fallback animations work
- [ ] Performance is acceptable on mobile
- [ ] Brand colors are consistent
- [ ] Loading states are smooth
- [ ] Interactive elements respond properly

## 6. Troubleshooting

### Spline Issues
- Check if Spline runtime is loading
- Verify scene URLs are correct
- Test fallback animations
- Check browser console for errors

### Video Issues
- Verify video files exist
- Check video format compatibility
- Test fallback formats
- Ensure proper file permissions

## 7. Customization

### Colors
Update brand colors in `tailwind.config.ts`:
```typescript
'brand-blue': '#003366',
'brand-green': '#66CC99',
```

### Animations
Modify Lottie animations in `/src/assets/` directory

### Components
Update Spline and video components in `/src/components/`

## Support

For issues with:
- **Spline**: Check Spline documentation and community
- **Videos**: Use video optimization tools and test across browsers
- **Performance**: Monitor loading times and optimize assets 