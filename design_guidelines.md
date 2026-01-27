# بايتون (Python Learning App) - Design Guidelines

## 1. Brand Identity

**Purpose**: A beginner-friendly Python learning app for Arabic speakers, making programming accessible and less intimidating.

**Aesthetic Direction**: **Playful/Approachable** - Rounded corners, friendly illustrations, warm colors that make coding feel welcoming rather than technical. Think "coding playground" not "code editor."

**Memorable Element**: The app uses a friendly snake mascot (subtle Python pun) that appears throughout the app as a learning companion, celebrating progress and providing encouragement.

**RTL Support**: Full Arabic language support with RTL (right-to-left) text layout.

## 2. Navigation Architecture

**Root Navigation**: Tab Navigation (4 tabs)

**Tabs** (right to left for Arabic):
1. **الدروس (Lessons)** - Browse learning modules
2. **التمارين (Practice)** - Coding exercises
3. **التقدم (Progress)** - Learning stats and achievements
4. **الملف (Profile)** - Settings and account

**Floating Action Button**: "ابدأ الدرس" (Start Lesson) - appears on Lessons tab when a lesson is selected.

**Auth**: No authentication required. Local storage with optional profile customization.

## 3. Screen-by-Screen Specifications

### 3.1 Lessons Screen
- **Purpose**: Browse and select Python learning modules
- **Layout**:
  - Header: Transparent, title "الدروس", search icon (left), settings icon (right)
  - Main: ScrollView with safe area top: headerHeight + Spacing.xl, bottom: tabBarHeight + Spacing.xl
  - Cards arranged vertically showing: lesson number, title, duration, completion status
- **Components**: Search bar (when tapped), lesson cards, section headers ("للمبتدئين", "متوسط")
- **Empty State**: Never empty (pre-populated lessons)

### 3.2 Lesson Detail Screen (Modal)
- **Purpose**: Complete a lesson with code examples
- **Layout**:
  - Header: Default navigation with close button (left), bookmark icon (right)
  - Main: ScrollView with code blocks, explanations in Arabic, "Try it" interactive sections
  - Bottom: Fixed navigation arrows (previous/next lesson)
- **Components**: Syntax-highlighted code blocks, expandable tip sections, progress indicator

### 3.3 Practice Screen
- **Purpose**: Solve coding challenges
- **Layout**:
  - Header: Transparent, title "التمارين", filter icon (right)
  - Main: Scrollable list, safe area top: headerHeight + Spacing.xl, bottom: tabBarHeight + Spacing.xl
  - Challenge cards showing: difficulty, topic, completion badge
- **Empty State**: "لم تكمل أي تمارين بعد" with illustration (empty-practice.png)

### 3.4 Progress Screen
- **Purpose**: Track learning journey
- **Layout**:
  - Header: Transparent, title "التقدم"
  - Main: ScrollView, safe area top: headerHeight + Spacing.xl, bottom: tabBarHeight + Spacing.xl
  - Stats cards (lessons completed, streak, total hours), achievement badges grid
- **Components**: Circular progress indicator, stat cards, badge collection

### 3.5 Profile Screen
- **Purpose**: Customize settings and view profile
- **Layout**:
  - Header: Transparent, title "الملف"
  - Main: Form layout, safe area top: headerHeight + Spacing.xl, bottom: tabBarHeight + Spacing.xl
  - Avatar (tappable), display name field, theme toggle, language selection, about/help links
- **Components**: Avatar picker (5 preset snake-themed avatars), switches, navigation list items

## 4. Color Palette

**Primary**: #4CAF50 (Python green - friendly, growth-oriented)
**Primary Dark**: #388E3C
**Accent**: #FFC107 (Warm amber - celebratory, achievement)
**Background**: #FAFAFA (Soft off-white)
**Surface**: #FFFFFF
**Surface Secondary**: #F5F5F5
**Text Primary**: #212121
**Text Secondary**: #757575
**Success**: #4CAF50
**Error**: #F44336
**Border**: #E0E0E0

## 5. Typography

**Primary Font**: Tajawal (Google Font - excellent Arabic support, friendly and modern)
**Code Font**: Fira Code (for code blocks - monospace with ligatures)

**Type Scale**:
- **Display**: Tajawal Bold, 32pt - screen titles
- **Heading**: Tajawal Bold, 24pt - section headers
- **Subheading**: Tajawal SemiBold, 18pt - card titles
- **Body**: Tajawal Regular, 16pt - main content
- **Caption**: Tajawal Regular, 14pt - metadata
- **Code**: Fira Code Regular, 14pt - code snippets

## 6. Visual Design

- **Icons**: Feather icons from @expo/vector-icons
- **Touchable Feedback**: Scale animation (0.95) + opacity (0.7) on press
- **Cards**: Rounded corners (16px), subtle border (#E0E0E0, 1px), no shadow
- **Floating Action Button**: 
  - shadowOffset: {width: 0, height: 2}
  - shadowOpacity: 0.10
  - shadowRadius: 2
- **Code Blocks**: Background #F5F5F5, border-radius 12px, padding 16px

## 7. Assets to Generate

### Required Assets:

1. **icon.png**
   - Friendly cartoon snake wearing graduation cap, green and amber colors
   - WHERE USED: App home screen icon

2. **splash-icon.png**
   - Simple Python logo stylized with snake mascot
   - WHERE USED: Launch screen

3. **empty-practice.png**
   - Snake mascot looking at empty checklist with encouraging expression
   - WHERE USED: Practice screen when no exercises completed

4. **empty-bookmarks.png**
   - Snake mascot with open book and bookmark
   - WHERE USED: Bookmarks section if user hasn't saved any lessons

5. **avatar-1.png** through **avatar-5.png**
   - Five snake mascot variations (different colors/accessories: green, blue, purple, orange, pink)
   - WHERE USED: Profile screen avatar picker

6. **success-celebration.png**
   - Snake mascot celebrating with confetti
   - WHERE USED: Lesson completion modal, achievement unlocks

7. **onboarding-welcome.png**
   - Snake mascot waving with laptop
   - WHERE USED: First-time user welcome screen

**Asset Style**: Flat, rounded illustration style. Simple shapes, friendly expressions, limited color palette matching brand colors. Avoid complexity - focus on charm.