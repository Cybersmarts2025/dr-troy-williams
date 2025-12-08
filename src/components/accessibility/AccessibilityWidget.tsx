import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { 
  Accessibility, 
  X, 
  Type, 
  Sun, 
  Moon, 
  Eye, 
  MousePointer2,
  RotateCcw,
  ZoomIn,
  Contrast,
  Link2
} from 'lucide-react';

interface AccessibilitySettings {
  fontSize: number;
  highContrast: boolean;
  reducedMotion: boolean;
  dyslexiaFont: boolean;
  highlightLinks: boolean;
  textSpacing: boolean;
  largePointer: boolean;
}

const defaultSettings: AccessibilitySettings = {
  fontSize: 100,
  highContrast: false,
  reducedMotion: false,
  dyslexiaFont: false,
  highlightLinks: false,
  textSpacing: false,
  largePointer: false,
};

const AccessibilityWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState<AccessibilitySettings>(defaultSettings);
  const [announcement, setAnnouncement] = useState('');

  // Announce changes to screen readers
  const announceChange = (message: string) => {
    setAnnouncement(message);
    // Clear after announcement is read
    setTimeout(() => setAnnouncement(''), 1000);
  };

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('accessibilitySettings');
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setSettings(parsed);
        applySettings(parsed);
      } catch (e) {
        console.error('Failed to parse accessibility settings', e);
      }
    }
  }, []);

  // Apply settings to document
  const applySettings = (newSettings: AccessibilitySettings) => {
    const root = document.documentElement;
    
    // Font size
    root.style.fontSize = `${newSettings.fontSize}%`;
    
    // High contrast
    if (newSettings.highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }
    
    // Reduced motion
    if (newSettings.reducedMotion) {
      root.classList.add('reduce-motion');
    } else {
      root.classList.remove('reduce-motion');
    }
    
    // Dyslexia font
    if (newSettings.dyslexiaFont) {
      root.classList.add('dyslexia-font');
    } else {
      root.classList.remove('dyslexia-font');
    }
    
    // Highlight links
    if (newSettings.highlightLinks) {
      root.classList.add('highlight-links');
    } else {
      root.classList.remove('highlight-links');
    }
    
    // Text spacing
    if (newSettings.textSpacing) {
      root.classList.add('increased-spacing');
    } else {
      root.classList.remove('increased-spacing');
    }
    
    // Large pointer
    if (newSettings.largePointer) {
      root.classList.add('large-cursor');
    } else {
      root.classList.remove('large-cursor');
    }
  };

  // Setting labels for announcements
  const settingLabels: Record<keyof AccessibilitySettings, string> = {
    fontSize: 'Font size',
    highContrast: 'High contrast mode',
    reducedMotion: 'Reduced motion',
    dyslexiaFont: 'Dyslexia-friendly font',
    highlightLinks: 'Link highlighting',
    textSpacing: 'Increased text spacing',
    largePointer: 'Large cursor',
  };

  // Update a single setting
  const updateSetting = <K extends keyof AccessibilitySettings>(
    key: K, 
    value: AccessibilitySettings[K]
  ) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    localStorage.setItem('accessibilitySettings', JSON.stringify(newSettings));
    applySettings(newSettings);
    
    // Announce the change to screen readers
    if (key === 'fontSize') {
      announceChange(`Font size changed to ${value} percent`);
    } else if (typeof value === 'boolean') {
      const status = value ? 'enabled' : 'disabled';
      announceChange(`${settingLabels[key]} ${status}`);
    }
  };

  // Reset all settings
  const resetSettings = () => {
    setSettings(defaultSettings);
    localStorage.removeItem('accessibilitySettings');
    applySettings(defaultSettings);
    announceChange('All accessibility settings have been reset to defaults');
  };

  return (
    <>
      {/* Screen Reader Announcements */}
      <div 
        role="status" 
        aria-live="polite" 
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>

      {/* Floating Button */}
      <motion.div
        className="fixed bottom-6 left-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.5 }}
      >
        <Button
          onClick={() => {
            setIsOpen(true);
            announceChange('Accessibility options panel opened');
          }}
          className="h-14 w-14 rounded-full bg-[#3C3B6E] hover:bg-[#2A2952] shadow-lg"
          size="icon"
          aria-label="Open accessibility options"
        >
          <Accessibility className="h-6 w-6 text-white" aria-hidden="true" />
        </Button>
      </motion.div>

      {/* Widget Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/50 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
            />
            
            {/* Panel */}
            <motion.div
              className="fixed bottom-24 left-6 z-50 w-80 max-h-[80vh] overflow-hidden"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="accessibility-title"
            >
              <Card className="shadow-2xl border-2 border-[#3C3B6E]">
                <CardHeader className="bg-[#3C3B6E] text-white pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle id="accessibility-title" className="flex items-center gap-2 text-lg">
                      <Accessibility className="h-5 w-5" aria-hidden="true" />
                      Accessibility Options
                    </CardTitle>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setIsOpen(false);
                        announceChange('Accessibility options panel closed');
                      }}
                      className="h-8 w-8 text-white hover:bg-white/20"
                      aria-label="Close accessibility options"
                    >
                      <X className="h-4 w-4" aria-hidden="true" />
                    </Button>
                  </div>
                </CardHeader>
                
                <CardContent className="p-4 space-y-6 max-h-[60vh] overflow-y-auto">
                  {/* Font Size */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <ZoomIn className="h-5 w-5 text-[#3C3B6E]" aria-hidden="true" />
                      <Label className="font-semibold">Font Size: {settings.fontSize}%</Label>
                    </div>
                    <Slider
                      value={[settings.fontSize]}
                      onValueChange={(value) => updateSetting('fontSize', value[0])}
                      min={75}
                      max={150}
                      step={5}
                      className="w-full"
                      aria-label="Adjust font size"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Smaller</span>
                      <span>Larger</span>
                    </div>
                  </div>

                  {/* High Contrast */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Contrast className="h-5 w-5 text-[#3C3B6E]" aria-hidden="true" />
                      <Label htmlFor="high-contrast" className="font-semibold">High Contrast</Label>
                    </div>
                    <Switch
                      id="high-contrast"
                      checked={settings.highContrast}
                      onCheckedChange={(checked) => updateSetting('highContrast', checked)}
                      aria-describedby="high-contrast-desc"
                    />
                  </div>
                  <p id="high-contrast-desc" className="sr-only">
                    Increases color contrast for better visibility
                  </p>

                  {/* Reduced Motion */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Eye className="h-5 w-5 text-[#3C3B6E]" aria-hidden="true" />
                      <Label htmlFor="reduced-motion" className="font-semibold">Reduce Motion</Label>
                    </div>
                    <Switch
                      id="reduced-motion"
                      checked={settings.reducedMotion}
                      onCheckedChange={(checked) => updateSetting('reducedMotion', checked)}
                      aria-describedby="reduced-motion-desc"
                    />
                  </div>
                  <p id="reduced-motion-desc" className="sr-only">
                    Disables animations for users sensitive to motion
                  </p>

                  {/* Dyslexia Font */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Type className="h-5 w-5 text-[#3C3B6E]" aria-hidden="true" />
                      <Label htmlFor="dyslexia-font" className="font-semibold">Dyslexia-Friendly Font</Label>
                    </div>
                    <Switch
                      id="dyslexia-font"
                      checked={settings.dyslexiaFont}
                      onCheckedChange={(checked) => updateSetting('dyslexiaFont', checked)}
                      aria-describedby="dyslexia-font-desc"
                    />
                  </div>
                  <p id="dyslexia-font-desc" className="sr-only">
                    Uses a font designed to be easier for people with dyslexia to read
                  </p>

                  {/* Highlight Links */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Link2 className="h-5 w-5 text-[#3C3B6E]" aria-hidden="true" />
                      <Label htmlFor="highlight-links" className="font-semibold">Highlight Links</Label>
                    </div>
                    <Switch
                      id="highlight-links"
                      checked={settings.highlightLinks}
                      onCheckedChange={(checked) => updateSetting('highlightLinks', checked)}
                      aria-describedby="highlight-links-desc"
                    />
                  </div>
                  <p id="highlight-links-desc" className="sr-only">
                    Adds visible highlights to all clickable links
                  </p>

                  {/* Text Spacing */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Type className="h-5 w-5 text-[#3C3B6E]" aria-hidden="true" />
                      <Label htmlFor="text-spacing" className="font-semibold">Increased Text Spacing</Label>
                    </div>
                    <Switch
                      id="text-spacing"
                      checked={settings.textSpacing}
                      onCheckedChange={(checked) => updateSetting('textSpacing', checked)}
                      aria-describedby="text-spacing-desc"
                    />
                  </div>
                  <p id="text-spacing-desc" className="sr-only">
                    Increases spacing between letters and lines for easier reading
                  </p>

                  {/* Large Cursor */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MousePointer2 className="h-5 w-5 text-[#3C3B6E]" aria-hidden="true" />
                      <Label htmlFor="large-cursor" className="font-semibold">Large Cursor</Label>
                    </div>
                    <Switch
                      id="large-cursor"
                      checked={settings.largePointer}
                      onCheckedChange={(checked) => updateSetting('largePointer', checked)}
                      aria-describedby="large-cursor-desc"
                    />
                  </div>
                  <p id="large-cursor-desc" className="sr-only">
                    Increases the size of the mouse cursor for better visibility
                  </p>

                  {/* Reset Button */}
                  <Button
                    variant="outline"
                    onClick={resetSettings}
                    className="w-full mt-4 border-[#B22234] text-[#B22234] hover:bg-[#B22234] hover:text-white"
                  >
                    <RotateCcw className="h-4 w-4 mr-2" aria-hidden="true" />
                    Reset All Settings
                  </Button>
                  
                  {/* Link to full accessibility page */}
                  <a 
                    href="/accessibility" 
                    className="block text-center text-sm text-[#3C3B6E] hover:underline mt-2"
                  >
                    View full accessibility statement
                  </a>
                </CardContent>
              </Card>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default AccessibilityWidget;
