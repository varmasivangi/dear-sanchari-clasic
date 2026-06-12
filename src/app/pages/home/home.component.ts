import { Component, ElementRef, ViewChild, HostListener, AfterViewInit, ChangeDetectorRef, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { NgOptimizedImage, CommonModule, isPlatformBrowser } from '@angular/common';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgOptimizedImage, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild('videoPlayerA') videoPlayerA!: ElementRef<HTMLVideoElement>;
  @ViewChild('videoPlayerB') videoPlayerB!: ElementRef<HTMLVideoElement>;
  @ViewChild('scrollSection') scrollSection!: ElementRef<HTMLElement>;
  @ViewChild('orbsCanvas')    orbsCanvas!: ElementRef<HTMLElement>;

  videos: string[] = [
    'herovideos/Scuba_diving_under_ocean_202606102158.mp4',
    'herovideos/now_same_way_paragliding_202606102202.mp4'
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
      name: 'Maldives Island Paradise',
      tagline: 'Coral Reefs & Oceanic Swells',
      desc: 'Indulge in private overwater villas, crystal lagoons, and direct access to marine life. Discover vibrant reef systems and surf pristine tropical swell lines.',
      img: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=800&q=80',
      stats: '5 Nights • Scuba Diving & Wave Surfing',
      highlights: ['Scuba Diving', 'Wave Surfing', 'Luxury Resort'],
      packages: [
        {
          name: 'Reef Explorer Suite',
          price: '$1,250',
          originalPrice: '$1,500',
          discount: '16% OFF',
          img: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=600&q=80',
          features: ['Water Villa Stay', '2 Guided Scuba Dives', 'Daily Beachfront Meals', 'Pro Surfboard Rental']
        },
        {
          name: 'Ocean Safari VIP',
          price: '$1,950',
          originalPrice: '$2,400',
          discount: '18% OFF',
          img: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&w=600&q=80',
          features: ['Overwater Pool Villa', '4 Boat Dives & POV Video', 'All-Inclusive Dine-Around', 'Private Yacht Tour']
        }
      ]
    },
    {
      name: 'Swiss Alps Adventure',
      tagline: 'Glacier Slopes & High-Altitude Flight',
      desc: 'Soar above snow-draped pine valleys and carve through majestic glacial ridges. The ultimate alpine combination of mountain flight and snow sports.',
      img: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
      stats: '4 Nights • Paragliding & Snow Skiing',
      highlights: ['Paragliding', 'Ski Lift Pass', 'Alpine Chalet'],
      packages: [
        {
          name: 'Alpine Peak Pass',
          price: '$740',
          originalPrice: '$920',
          discount: '19% OFF',
          img: 'https://images.unsplash.com/photo-1531366936336-62fc674baa3e?auto=format&fit=crop&w=600&q=80',
          features: ['Boutique Chalet Lodging', 'Tandem Paragliding Flight', '3-Day Ski Lift Ticket', 'Thermal Spa Access']
        },
        {
          name: 'Extreme Glacier Summit',
          price: '$1,150',
          originalPrice: '$1,450',
          discount: '20% OFF',
          img: 'https://images.unsplash.com/photo-1518098268026-4e43a1a009de?auto=format&fit=crop&w=600&q=80',
          features: ['5-Star Alpine Suite Stay', 'Canyon Paragliding Duo', 'Guided Glacier Ski Tour', 'Helicopter Transfer']
        }
      ]
    },
    {
      name: 'Bali Jungle & Rivers',
      tagline: 'Sacred Canyons & Sunrise Peaks',
      desc: 'Battle rushing Class 4-5 rapids, scale active volcanic craters at dawn, and explore lush rainforest sanctuaries in the cultural heart of Ubud.',
      img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80',
      stats: '4 Nights • River Rafting & Volcano Trekking',
      highlights: ['River Rafting', 'Volcano Trek', 'Jungle Villa'],
      packages: [
        {
          name: 'Ubud Adventure Pack',
          price: '$380',
          originalPrice: '$480',
          discount: '20% OFF',
          img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80',
          features: ['Private Pool Jungle Cabin', 'Ayung River Rafting Tour', 'Mount Batur Sunrise Trek', 'Organic Spa Treatment']
        },
        {
          name: 'Wild Canyon Explorer',
          price: '$590',
          originalPrice: '$750',
          discount: '21% OFF',
          img: 'https://images.unsplash.com/photo-1530866495561-507c9faab2ed?auto=format&fit=crop&w=600&q=80',
          features: ['Luxury Eco-Lodge Stay', 'Class V Extreme Rafting', 'Volcano Heli-Sightseeing', 'Personal Local Guide']
        }
      ]
    },
    {
      name: 'Kyoto Scenic Heritage',
      tagline: 'Ancient Valleys & Bamboo Trails',
      desc: 'Rise silently in a hot air balloon over ancient pagodas and cycle through legendary bamboo forest passes in Japan\'s cultural capital.',
      img: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80',
      stats: '3 Nights • Hot Air Ballooning & Temple Cycling',
      highlights: ['Balloon Launch', 'Bamboo Cycles', 'Historic Ryokan'],
      packages: [
        {
          name: 'Cultural Summit Ryokan',
          price: '$420',
          originalPrice: '$540',
          discount: '22% OFF',
          img: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=600&q=80',
          features: ['Traditional Ryokan Stay', 'Sunrise Balloon Flight', 'Bicycle Heritage Pass', 'Kaiseki Dinner Tour']
        },
        {
          name: 'VIP Imperial Horizon',
          price: '$780',
          originalPrice: '$990',
          discount: '21% OFF',
          img: 'https://images.unsplash.com/photo-1542044896530-05d85be9b11a?auto=format&fit=crop&w=600&q=80',
          features: ['Heritage Suite Lodging', 'Private Balloon Flight', 'Arashiyama Zipline Pass', 'Private Tea Master Class']
        }
      ]
    },
    {
      name: 'Santorini Sunset Voyager',
      tagline: 'Caldera Heights & Yacht Cruises',
      desc: 'Leap off towering volcanic cliffs, cruise deep blue caldera bays, and hike spectacular cliffside trails overlooking whitewashed villages.',
      img: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80',
      stats: '3 Nights • Caldera Cliff Jumping & Catamaran Sailing',
      highlights: ['Cliff Jumping', 'Catamaran Cruise', 'Caldera Views'],
      packages: [
        {
          name: 'Aegean Horizon Studio',
          price: '$520',
          originalPrice: '$650',
          discount: '20% OFF',
          img: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=600&q=80',
          features: ['Cliffview Cave Studio', 'Catamaran Sunset Cruise', 'Guided Cliffside Hike', 'Greek Buffet Breakfast']
        },
        {
          name: 'Caldera Voyager VIP',
          price: '$890',
          originalPrice: '$1,120',
          discount: '20% OFF',
          img: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=600&q=80',
          features: ['Honeymoon Pool Suite', 'Private Yacht Sailing Tour', 'Volcanic Cave Diving', 'Caldera Fine Dining']
        }
      ]
    },
    {
      name: 'Iceland Aurora Explorer',
      tagline: 'Ice Canyons & Geothermal Lakes',
      desc: 'Climb vertical frozen waterfalls and hike ancient glacier cracks before soaking in warm geothermal lagoons under the northern lights.',
      img: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=80',
      stats: '5 Nights • Ice Climbing & Glacier Hiking',
      highlights: ['Ice Climbing', 'Geothermal Spa', 'Aurora Hunt'],
      packages: [
        {
          name: 'Northern Lights Adventure',
          price: '$680',
          originalPrice: '$850',
          discount: '20% OFF',
          img: 'https://images.unsplash.com/photo-1483168527879-c66136b56105?auto=format&fit=crop&w=600&q=80',
          features: ['Scenic Cabin Lodging', 'Guided Glacier Hike', 'Blue Lagoon Admission', 'Aurora Jeep Hunt Tour']
        },
        {
          name: 'Glacier Peak Expert',
          price: '$1,290',
          originalPrice: '$1,650',
          discount: '21% OFF',
          img: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=600&q=80',
          features: ['Boutique Design Hotel', 'Ice Fall Lead Climb Guide', 'Superjeep Glacier Safari', 'Geothermal Spa VIP']
        }
      ]
    },
    {
      name: 'Dubai Desert Safari',
      tagline: 'Golden Dunes & Skydiving Heights',
      desc: 'Step out of an aircraft over Palm Jumeirah at 15,000 feet and race across golden desert sand dunes in custom off-road vehicles.',
      img: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
      stats: '3 Nights • Skydiving & Dune Bashing',
      highlights: ['Palm Skydive', 'Dune Bashing', 'Desert Camp'],
      packages: [
        {
          name: 'Desert Thrill & Skydive',
          price: '$490',
          originalPrice: '$620',
          discount: '20% OFF',
          img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
          features: ['Luxury City Hotel Stay', 'Tandem Palm Skydive', 'Desert Dune Bashing Tour', 'Arabic Buffet Dinner']
        },
        {
          name: 'Royal Falcon VIP',
          price: '$980',
          originalPrice: '$1,250',
          discount: '21% OFF',
          img: 'https://images.unsplash.com/photo-1489493887462-402b7264e919?auto=format&fit=crop&w=600&q=80',
          features: ['Desert Resort Pool Villa', 'Premium Skydive & Video', 'Private Hummer Desert Tour', 'Private Falconry Session']
        }
      ]
    },
    {
      name: 'Patagonia Wild Frontiers',
      tagline: 'Sheer Peaks & Swift Rivers',
      desc: 'Scale sheer granite spires and paddle through wild glacier-fed rivers in South America\'s most spectacular wilderness frontier.',
      img: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=800&q=80',
      stats: '6 Nights • Granite Climbing & Whitewater Kayaking',
      highlights: ['Spire Climbing', 'River Kayaking', 'Base Camp Dome'],
      packages: [
        {
          name: 'Fitz Roy Base Camp',
          price: '$550',
          originalPrice: '$720',
          discount: '23% OFF',
          img: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=600&q=80',
          features: ['Alpine Dome Lodging', 'Guided Spire Rock Climb', 'Glacier Kayak Tour', 'Traditional BBQ Feast']
        },
        {
          name: 'Patagonia Extreme Guide',
          price: '$1,180',
          originalPrice: '$1,480',
          discount: '20% OFF',
          img: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=600&q=80',
          features: ['Premium Wilderness Lodge', 'Multi-Pitch Spire Guide', 'Full Glacier River Safari', 'Private Packhorse Support']
        }
      ]
    }
  ];
  activeActivityIndex = 0;

  // Employee Weekend Trips (Out of Office Escapes) Data
  activeWeekendIndex = 0;
  activeMomentIndex = 0;
  weekendTrips = [
    {
      name: 'Coorg Coffee & Clouds',
      vibe: 'Valley of Mist',
      duration: '2 Days / 1 Night',
      price: '$180',
      slides: [
        {
          title: 'Morning Drive',
          time: 'Sat 08:00 AM',
          desc: 'Wind through coffee estates covered in morning fog.',
          img: 'https://images.unsplash.com/photo-1542856391-010fb87dcfed?auto=format&fit=crop&w=600&q=80'
        },
        {
          title: 'Canopy Zipline',
          time: 'Sat 02:00 PM',
          desc: 'Walk suspended walkways and try forest ziplining.',
          img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80'
        },
        {
          title: 'Abbey Falls Sunrise',
          time: 'Sun 06:00 AM',
          desc: 'Watch the golden sun light up the forest streams.',
          img: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=600&q=80'
        }
      ]
    },
    {
      name: 'Gokarna Coastline Trek',
      vibe: 'Cliffside Beach Shore',
      duration: '3 Days / 2 Nights',
      price: '$290',
      slides: [
        {
          title: 'Overnight Sleeper Route',
          time: 'Fri 09:00 PM',
          desc: 'Shut your laptop, catch the sleeper, and wake up to waves.',
          img: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=600&q=80'
        },
        {
          title: 'Om Beach Shore Walk',
          time: 'Sat 08:00 AM',
          desc: 'Hike along pristine golden sand beaches with clear waters.',
          img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80'
        },
        {
          title: 'Dolphin Safari Boat Cruise',
          time: 'Sun 09:00 AM',
          desc: 'Sail alongside wild dolphins in the blue morning ocean.',
          img: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80'
        }
      ]
    },
    {
      name: 'Wayanad Canopy & Caves',
      vibe: 'Tropical Canopy Reset',
      duration: '3 Days / 2 Nights',
      price: '$320',
      slides: [
        {
          title: 'Prehistoric Cave Trek',
          time: 'Sat 09:00 AM',
          desc: 'Climb prehistoric Edakkal rock caves and decode inscriptions.',
          img: 'https://images.unsplash.com/photo-1472214222541-d510753a4907?auto=format&fit=crop&w=600&q=80'
        },
        {
          title: 'Bamboo Forest Rafting',
          time: 'Sat 02:00 PM',
          desc: 'Float down quiet rainforest rivers on handmade bamboo rafts.',
          img: 'https://images.unsplash.com/photo-1546548970-71785318a17b?auto=format&fit=crop&w=600&q=80'
        },
        {
          title: 'Luxury Treehouse Stay',
          time: 'Sun 10:00 AM',
          desc: 'Unwind in a designer treehouse overlooking foggy valleys.',
          img: 'https://images.unsplash.com/photo-1508193638397-1c4234db14d8?auto=format&fit=crop&w=600&q=80'
        }
      ]
    }
  ];

  // Cached layout metrics to avoid forced synchronous reflows
  private sectionTop = 0;
  private scrollDistance = 0;
  private maxCanvasTranslate = 0;
  private ticking = false;
  private activityTops: number[] = [];

  constructor(
    private cdr: ChangeDetectorRef,
    private seoService: SeoService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    this.seoService.updateSeoData({
      title: 'Dear Sanchari - Immersive Travel & Luxury Tour Packages',
      description: 'Explore breathtaking destinations, premium hotels, and thrilling travel packages. From the Maldives to the Swiss Alps, book your next luxury vacation.',
      keywords: 'travel packages, luxury tours, escape vacation, maldives tour, swiss alps tour, adventure travel',
      image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80'
    });
    this.seoService.updateCanonicalUrl('https://dearsanchari.com/');
  }

  selectWeekend(index: number) {
    this.activeWeekendIndex = index;
    this.activeMomentIndex = 0;
  }

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



    this.onScroll();
  }
}
