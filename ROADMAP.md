# GutterGoblins Product Roadmap

## Vision
Build a bowling-focused app that helps players track performance, develop their arsenal, and improve technique through video-based coaching feedback.

## Core Goals
- Keep score and log games easily
- Build and manage a personal bowling arsenal
- Track averages, personal bests, trends, and milestones
- Offer AI-assisted video review for form and delivery feedback

## Phase 1: MVP Foundation
Focus on the core experience and get the app usable quickly.

### Features
- User profile and account setup
- Create and manage bowling sessions
- Score entry for games and frames
- Game history and basic stats
- Simple dashboard with recent games and averages

### Deliverables
- Landing page and app shell
- Scorekeeping workflow
- Local or cloud data persistence
- Basic analytics overview

### Timeline
- Week 1-2: app structure, authentication, UI foundation
- Week 3-4: score entry, game history, stats dashboard

## Phase 2: Arsenal and Player Profiles
Make the app more personal and useful for repeat players.

### Features
- Ball library with brand, model, weight, surface, and hook profile
- Bowling style profiles
- Favorite equipment and lane-condition notes
- Session notes and coaching highlights

### Deliverables
- Arsenal management screen
- Player profile page
- Equipment comparison and tagging

### Timeline
- Week 5-6

## Phase 3: Performance Analytics
Turn raw scores into insights.

### Features
- Average score by session, month, and season
- Personal bests and record tracking
- Strike/spare percentages
- Trend charts and performance summaries
- Goal setting and milestone tracking

### Deliverables
- Analytics dashboard
- Progress charts
- Personal bests and milestone views

### Timeline
- Week 7-8

## Phase 4: Video Coaching MVP
Introduce the first version of video-based improvement tools.

### Features
- Record or upload bowling videos
- Store clips by session and technique focus
- Manual review checklist for approach, release, and follow-through
- Basic feedback suggestions based on user-selected issues

### Deliverables
- Video upload/recording workflow
- Clip review screen
- Coaching notes and improvement recommendations

### Timeline
- Week 9-12

## Phase 5: AI Coaching Assistant
Add intelligent feedback for deeper analysis.

### Features
- Pose and movement analysis from video
- Suggested fixes for release timing, balance, swing path, and posture
- Comparison against previous video sessions
- AI-generated coaching summaries
- Optional premium coaching insights

### Deliverables
- AI analysis pipeline
- Feedback report generation
- Personalized coaching recommendations

### Timeline
- Month 4 onward

## Recommended Technical Stack
- Frontend: React + TypeScript + Vite
- Styling: CSS modules or Tailwind
- Backend: Node.js / Express or Next.js API routes
- Database: PostgreSQL or Supabase
- File storage: Cloud storage for video uploads
- AI/ML: computer vision model or external video analysis service

## Suggested Data Model
- Users
- Games
- Frames
- Rolls
- Sessions
- Balls / Arsenal Items
- Videos
- Coaching Feedback

## Priority Order
1. Scorekeeping
2. Game history and stats
3. Arsenal builder
4. Personal averages and bests
5. Video recording and review
6. AI coaching feedback

## Success Metrics
- Users can log a full game in under 2 minutes
- Users return weekly to review stats
- Users upload and review at least one coaching video
- Users complete a recommended improvement action from feedback

## Next Step
Start with the MVP scope: scorekeeping, game history, and basic stats. Once that is stable, build the arsenal system, then add video coaching and AI analysis.
