
import React, { useEffect, useRef } from 'react';

const SoundManager: React.FC = () => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const isMutedRef = useRef(false);

  useEffect(() => {
    // Initialize Audio Context on first user interaction to bypass autoplay policy
    const initAudio = () => {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      if (audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume();
      }
    };

    const toggleSound = () => {
        isMutedRef.current = !isMutedRef.current;
    }

    window.addEventListener('click', initAudio);
    window.addEventListener('keydown', initAudio);
    window.addEventListener('GREY_TOGGLE_SOUND', toggleSound);

    return () => {
      window.removeEventListener('click', initAudio);
      window.removeEventListener('keydown', initAudio);
      window.removeEventListener('GREY_TOGGLE_SOUND', toggleSound);
    };
  }, []);

  const playOscillator = (freq: number, type: 'sine' | 'square' | 'triangle', duration: number, gainVal: number) => {
    if (!audioContextRef.current || isMutedRef.current) return;

    const ctx = audioContextRef.current;
    
    // Only create nodes if context is ready
    if (ctx.state === 'closed') return;

    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.type = type;
    oscillator.frequency.setValueAtTime(freq, ctx.currentTime);
    
    gainNode.gain.setValueAtTime(gainVal, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.start();
    oscillator.stop(ctx.currentTime + duration);
  };

  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button')) {
        // High pitched, short, airy sound for hover
        playOscillator(800, 'sine', 0.1, 0.05);
      }
    };

    const handleClick = (e: MouseEvent) => {
      // Deeper, more tactile sound for click
      playOscillator(300, 'triangle', 0.15, 0.1);
    };

    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('click', handleClick);
    };
  }, []);

  return null; // Headless component
};

export default SoundManager;
