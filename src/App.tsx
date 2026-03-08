/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import PasswordGate from './components/PasswordGate';
import ComplimentGenerator from './components/ComplimentGenerator';

export default function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);

  return (
    <main className="min-h-screen w-full">
      {isUnlocked ? (
        <ComplimentGenerator />
      ) : (
        <PasswordGate onUnlock={() => setIsUnlocked(true)} />
      )}
    </main>
  );
}
