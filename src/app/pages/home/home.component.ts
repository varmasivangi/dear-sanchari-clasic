import { Component, ElementRef, ViewChild, HostListener, AfterViewInit, ChangeDetectorRef, Inject, PLATFORM_ID } from '@angular/core';
import { NgOptimizedImage, CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgOptimizedImage, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewInit {
  @ViewChild('videoPlayerA') videoPlayerA!: ElementRef<HTMLVideoElement>;
  @ViewChild('videoPlayerB') videoPlayerB!: ElementRef<HTMLVideoElement>;
  @ViewChild('scrollSection') scrollSection!: ElementRef<HTMLElement>;
  @ViewChild('orbsCanvas')    orbsCanvas!: ElementRef<HTMLElement>;

  videos: string[] = [
    'https://assets.mixkit.co/videos/preview/mixkit-underwater-light-beams-and-bubbles-40997-large.mp4',
    'https://assets.mixkit.co/videos/preview/mixkit-scenic-canyon-with-river-valley-41584-large.mp4'
  ];
  activeVideoPlayer: 'A' | 'B' = 'A';

  // Destinations list for dynamic horizontal scroll transitions
  destinations = [
    { name: 'Maldives', subtitle: 'Private Escapes' },
    { name: 'Swiss Alps', subtitle: 'Alpine Serenity' },
    { name: 'Kyoto', subtitle: 'Zen Gardens' },
    { name: 'Santorini', subtitle: 'Sunset Horizons' },
    { name: 'Bali', subtitle: 'Tropical Sanctuaries' },
    { name: 'Iceland', subtitle: 'Aurora Dreams' },
    { name: 'Dubai', subtitle: 'Golden Luxury' },
    { name: 'Patagonia', subtitle: 'Wild Frontiers' },
    { name: 'Thailand', subtitle: 'Temple Trails' },
    { name: 'Amalfi Coast', subtitle: 'Italian Dreams' }
  ];
  activeDestIndex = -1; // -1 represents initial state showing default description

  // Dynamic interactive showcase activities with contextual package pricing and offer tags
  activities = [
    {
      name: 'Paragliding',
      tagline: 'Soar Above Valleys',
      desc: 'Glide above emerald valley landscapes at 2,000m. Experience the absolute weightless freedom of flight under expert guidance.',
      img: 'https://images.unsplash.com/photo-1596701062351-df5f8af54b85?auto=format&fit=crop&w=800&q=80',
      stats: '2,000m Altitude • 45 Mins Flight',
      packages: [
        {
          name: 'Tandem Joyride',
          price: '$140',
          originalPrice: '$180',
          discount: '22% OFF',
          features: ['25 Mins Airtime', 'GoPro Raw Video', 'Safety Gear Included']
        },
        {
          name: 'Thermal Cross-Country',
          price: '$280',
          originalPrice: '$350',
          discount: '20% OFF',
          features: ['60 Mins Flight', 'HD Drone Footage', 'Hotel Pick & Drop']
        }
      ]
    },
    {
      name: 'Scuba Diving',
      tagline: 'Explore Coral Kingdoms',
      desc: 'Plunge into breathtaking marine sanctuaries. Drift alongside schools of tropical fish and explore deep volcanic reef structures.',
      img: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
      stats: '30m Depth • Guided Reef Tour',
      packages: [
        {
          name: 'Reef Explorer',
          price: '$90',
          originalPrice: '$120',
          discount: '25% OFF',
          features: ['1 Shore Dive', 'Full Gear Rental', 'Marine Park Entry']
        },
        {
          name: 'Deep Ocean Safari',
          price: '$190',
          originalPrice: '$240',
          discount: '20% OFF',
          features: ['2 Boat Dives', 'HD Photoshoot', 'Lunch & Drinks']
        }
      ]
    },
    {
      name: 'Bungee Jumping',
      tagline: 'Defy Gravity Head-First',
      desc: 'Leap head-first from a suspended bridge over wild river canyons. Feel the ultimate peak of pure, unadulterated adrenaline.',
      img: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80',
      stats: '160m Freefall • Canyon Bridge',
      packages: [
        {
          name: 'Single Canyon Leap',
          price: '$75',
          originalPrice: '$99',
          discount: '24% OFF',
          features: ['160m Jump', 'Safety Harness', 'Certificate of Courage']
        },
        {
          name: 'Ultimate Leap Duo',
          price: '$130',
          originalPrice: '$170',
          discount: '23% OFF',
          features: ['2 Canyon Jumps', 'POV Wrist Cam Video', 'T-Shirt Souvenir']
        }
      ]
    },
    {
      name: 'Skydiving',
      tagline: 'Terminal Velocity Rush',
      desc: 'Step out of an aircraft at 15,000 feet. Experience a 60-second freefall at 120mph before gliding peacefully over scenic coastlines.',
      img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
      stats: '15,000ft Altitude • 120mph Fall',
      packages: [
        {
          name: 'Tandem Jump 10k',
          price: '$220',
          originalPrice: '$290',
          discount: '24% OFF',
          features: ['10,000ft Jump', '30s Freefall', 'Instructor Tandem']
        },
        {
          name: 'Extreme Jump 15k',
          price: '$340',
          originalPrice: '$420',
          discount: '19% OFF',
          features: ['15,000ft Jump', '60s Freefall', 'Handcam Video & Photos']
        }
      ]
    },
    {
      name: 'Wave Surfing',
      tagline: 'Ride Oceanic Swells',
      desc: 'Master the power of the ocean by carving pristine waves. Learn from pro riders on world-famous tropical coastlines.',
      img: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=800&q=80',
      stats: 'Surf Camp • All Skill Levels',
      packages: [
        {
          name: 'Beginner Surf Lesson',
          price: '$45',
          originalPrice: '$60',
          discount: '25% OFF',
          features: ['2 Hour Session', 'Softboard Rental', 'Rash Guard Provided']
        },
        {
          name: 'Pro Surf Coaching',
          price: '$110',
          originalPrice: '$140',
          discount: '21% OFF',
          features: ['Full Day Tour', 'Fiberglass Board', 'Video Analysis Session']
        }
      ]
    },
    {
      name: 'River Rafting',
      tagline: 'Battle Whitewater Rapids',
      desc: 'Paddle through churning Class 4-5 rapids and narrow rocky canyons in a high-octane team challenge.',
      img: 'https://images.unsplash.com/photo-1530866495561-507c9faab2ed?auto=format&fit=crop&w=800&q=80',
      stats: 'Grade 4-5 Rapids • Canyon Trail',
      packages: [
        {
          name: 'Classic Rapids',
          price: '$65',
          originalPrice: '$85',
          discount: '23% OFF',
          features: ['12km River Trail', 'Safety Kayak Escort', 'Hot Shower & Changing']
        },
        {
          name: 'Extreme Whitewater',
          price: '$115',
          originalPrice: '$150',
          discount: '23% OFF',
          features: ['22km Class V Rapids', 'BBQ Buffet Lunch', 'Action GoPro Video']
        }
      ]
    },
    {
      name: 'Rock Climbing',
      tagline: 'Ascend Sheer Cliff Faces',
      desc: 'Conquer vertical natural crags using dynamic climbing techniques. Build absolute focus, strength, and tactical route planning.',
      img: 'https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&w=800&q=80',
      stats: 'Natural Crags • Advanced Rigging',
      packages: [
        {
          name: 'Intro to Crag',
          price: '$55',
          originalPrice: '$75',
          discount: '26% OFF',
          features: ['Half-Day Climb', 'Harness & Shoes', 'Top-Rope Belaying']
        },
        {
          name: 'Multi-Pitch Guide',
          price: '$140',
          originalPrice: '$180',
          discount: '22% OFF',
          features: ['Full-Day Lead Climb', 'All Pro Gear', 'Snacks & Hydration']
        }
      ]
    },
    {
      name: 'Hot Air Balloon',
      tagline: 'Drift Over Ancient Valleys',
      desc: 'Rise silently at dawn and watch the sunrise illuminate volcanic fairy chimneys and valleys from a panoramic bird\'s-eye view.',
      img: 'https://images.unsplash.com/photo-1531219572328-a0e75bc6d9a6?auto=format&fit=crop&w=800&q=80',
      stats: 'Dawn Launch • Cappadocia Flight',
      packages: [
        {
          name: 'Standard Sunrise',
          price: '$160',
          originalPrice: '$200',
          discount: '20% OFF',
          features: ['60-Min Flight', 'Champagne Celebration', 'Flight Certificate']
        },
        {
          name: 'VIP Private Basket',
          price: '$490',
          originalPrice: '$600',
          discount: '18% OFF',
          features: ['Private Balloon', 'Gourmet Breakfast', 'Private Hotel Transfer']
        }
      ]
    }
  ];
  activeActivityIndex = 0;

  // Cached layout metrics to avoid forced synchronous reflows
  private sectionTop = 0;
  private scrollDistance = 0;
  private maxCanvasTranslate = 0;
  private ticking = false;
  private activityTops: number[] = [];

  constructor(
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => this.recalculateLayout(), 100);

      // Force play active video player A
      setTimeout(() => {
        if (this.videoPlayerA?.nativeElement) {
          this.videoPlayerA.nativeElement.play().catch(err => {
            console.log('Video Player A play failed:', err);
          });
        }
      }, 50);
    }
  }

  onVideoAEnded() {
    if (isPlatformBrowser(this.platformId) && this.videoPlayerB?.nativeElement) {
      const videoB = this.videoPlayerB.nativeElement;
      videoB.load();
      videoB.play().then(() => {
        this.activeVideoPlayer = 'B';
        this.cdr.detectChanges();
      }).catch(err => console.log('Video Player B play failed on transition:', err));
    }
  }

  onVideoBEnded() {
    if (isPlatformBrowser(this.platformId) && this.videoPlayerA?.nativeElement) {
      const videoA = this.videoPlayerA.nativeElement;
      videoA.load();
      videoA.play().then(() => {
        this.activeVideoPlayer = 'A';
        this.cdr.detectChanges();
      }).catch(err => console.log('Video Player A play failed on transition:', err));
    }
  }

  @HostListener('window:resize')
  onResize() {
    if (isPlatformBrowser(this.platformId)) {
      this.recalculateLayout();
    }
  }

  @HostListener('window:scroll')
  onScroll() {
    if (!isPlatformBrowser(this.platformId)) return;

    const scrollY = window.scrollY || window.pageYOffset;

    // 1. Calculate active activity row based on viewport center positioning
    const scrollCenter = scrollY + window.innerHeight * 0.45;
    let closestActivityIndex = 0;
    let minDiff = Infinity;

    for (let idx = 0; idx < this.activityTops.length; idx++) {
      const diff = Math.abs(this.activityTops[idx] - scrollCenter);
      if (diff < minDiff) {
        minDiff = diff;
        closestActivityIndex = idx;
      }
    }

    if (closestActivityIndex !== this.activeActivityIndex && this.activityTops.length > 0) {
      this.activeActivityIndex = closestActivityIndex;
      this.cdr.detectChanges();
    }

    // 2. Destinations horizontal scroll track calculations
    if (this.scrollDistance <= 0 || !this.orbsCanvas?.nativeElement) return;
    const progress = Math.min(1, Math.max(0, (scrollY - this.sectionTop) / this.scrollDistance));

    if (!this.ticking) {
      this.ticking = true;
      requestAnimationFrame(() => {
        if (this.orbsCanvas?.nativeElement) {
          const translateX = -progress * this.maxCanvasTranslate;
          this.orbsCanvas.nativeElement.style.transform = `translateX(${translateX}px)`;
        }

        // Calculate dynamic active destination index based on scroll progress
        let newIndex = -1;
        if (progress >= 0.80) {
          newIndex = 10; // 10 represents the end-card transition state (fades out left title block)
        } else if (progress >= 0.02) {
          // Normalize progress from 0.02 to 0.80
          const normalizedProgress = (progress - 0.02) / 0.78;
          const index = Math.round(normalizedProgress * (this.destinations.length - 1));
          newIndex = Math.min(this.destinations.length - 1, Math.max(0, index));
        }

        if (newIndex !== this.activeDestIndex) {
          this.activeDestIndex = newIndex;
          this.cdr.detectChanges(); // Trigger Angular change detection inside requestAnimationFrame
        }

        this.ticking = false;
      });
    }
  }

  private recalculateLayout() {
    if (!isPlatformBrowser(this.platformId)) return;
    if (!this.scrollSection?.nativeElement || !this.orbsCanvas?.nativeElement) return;

    const section = this.scrollSection.nativeElement;
    const canvas  = this.orbsCanvas.nativeElement;

    let top = 0;
    let obj = section;
    while (obj) {
      top += obj.offsetTop;
      obj = obj.offsetParent as HTMLElement;
    }
    this.sectionTop = top;

    this.scrollDistance = section.offsetHeight - window.innerHeight;
    this.maxCanvasTranslate = Math.max(0, canvas.scrollWidth - window.innerWidth);

    // Recalculate activity list item top positions once for scroll calculations
    const items = document.querySelectorAll('.act-list-item');
    this.activityTops = [];
    items.forEach((item) => {
      let itemTop = 0;
      let currentObj = item as HTMLElement;
      while (currentObj) {
        itemTop += currentObj.offsetTop;
        currentObj = currentObj.offsetParent as HTMLElement;
      }
      this.activityTops.push(itemTop);
    });

    this.onScroll();
  }
}
