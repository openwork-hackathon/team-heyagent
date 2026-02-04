# Battle Mode Component

A Pokémon-style agent negotiation simulator.

## Usage

```tsx
import { BattleArena } from '@/app/components/battle-mode';

export default function Page() {
  return (
    <div className="p-8 bg-black min-h-screen flex items-center justify-center">
      <div className="w-full max-w-4xl">
        <BattleArena />
      </div>
    </div>
  );
}
```

## Features
- **Simulation**: Mock negotiation between "Jubei" (User) and "Sally" (AI).
- **Dual View**: Natural language bubbles + JSON protocol toggle.
- **Controls**: Play/Pause, 1x/2x Speed.
