import React, { useState, useEffect } from 'react';

// We use useState to keep an array of assignment objects in memory.
// This completely replaces manual HTML string generation (container.innerHTML).
// When this array changes, React automatically intercepts the change and re-renders the list.
  // 1. STATE MANAGEMENT
  const [assignments, setAssignments] = useState([
    { id: 1, earned: '', possible: '', weight: '' }
  ]);
  // This tracks the live output of the current weighted calculation
  const [currentGrade, setCurrentGrade] = useState('Enter points to see your grade.');

  // Goal Calculator input states
  // By capturing keystrokes live, we can skip using querySelectors
  // This allows us to pull data from the fields when a button is clicked so data flows natively
  const [targetGrade, setTargetGrade] = useState('');
  const [futurePointsPossible, setFuturePointsPossible] = useState('');
  const [futureWeight, setFutureWeight] = useState('');
  const [goalResult, setGoalResult] = useState('Enter your goal details to calculate.');



  // 2. LOGIC FUNCTIONS

  // Using an immutable array here instead of global counter variable
  // This allows us to use a maxID+1 to guarantee a unique key for each item
  const addAssignment = () => {
    const nextId = assignments.length > 0 ? Math.max(...assignments.map(a => a.id)) + 1 : 1;
    setAssignments([...assignments, { id: nextId, earned: '', possible: '', weight: '' }]);
  };

  // We use this right here to create new array copy cutting the target item
  // This forces a visible UI render cycle
  const removeAssignment = (id) => {
    setAssignments(assignments.filter(a => a.id !== id));
  };

  // This is a deep object copying pattern that maps the whole state array
  // Then it finds the target id, opens its properties and changes only the updated field
  // We do this for data integrity and security
  const handleInputChange = (id, field, value) => {
    setAssignments(assignments.map(a => {
      if (a.id === id) {
        return { ...a, [field]: value };
      }
      return a;
    }));
  };

  // This is a reset function to return all objects to an empty baseline
  const clearAll = () => {
    setAssignments([]);
    setTargetGrade('');
    setFuturePointsPossible('');
    setFutureWeight('');
  };

  // 3. AUTOMATIC GRADE RECALCULATION (useEffect)
  // This is an auto event listener that checks for changes in our array
  // When a user makes any changes, this executes it instantly
  // Then we don't need separate triggers for each button click event
  useEffect(() => {
    let totalWeightedEarned = 0;
    let totalWeight = 0;
    let hasValidInput = false;

    assignments.forEach(a => {
      const earned = parseFloat(a.earned);
      const possible = parseFloat(a.possible);
      const weight = parseFloat(a.weight);

      // Basic boundary validation
      // Nobody wants random division by zero crashes if a user enters 0 into 'points possible'
      if (!isNaN(earned) && !isNaN(possible) && !isNaN(weight) && possible > 0) {
        hasValidInput = true;
        totalWeightedEarned += (earned / possible) * weight;
        totalWeight += weight;
      }
    });

    // Basic math eval to update display state only if mathematical weights add up cleanly
    if (hasValidInput && totalWeight > 0) {
      const finalScore = ((totalWeightedEarned / totalWeight) * 100).toFixed(2);
      setCurrentGrade(`Current Weighted Grade: ${finalScore}%`);
    } else {
      setCurrentGrade('Enter points to see your grade.');
    }
  }, [assignments]);

  // 4. GOAL CALCULATOR LOGIC (useEffect)
  // This is essentially multi-variable tracking effect pipeline, separate from main grade calc
  // Because the required logic relies on a different set of inputs, this only fires off when goal calc. state updates
  useEffect(() => {
    const target = parseFloat(targetGrade);
    const futPts = parseFloat(futurePointsPossible);
    const futWt = parseFloat(futureWeight);

    if (!isNaN(target) && !isNaN(futPts) && !isNaN(futWt) && futWt > 0) {
      // Simple grade math calculation demonstration
      const requiredPercent = (target / 100).toFixed(2);
      setGoalResult(`To hit ${target}%, you need to score efficiently on future assignments.`);
    } else {
      setGoalResult('Enter your goal details to calculate.');
    }
  }, [targetGrade, futurePointsPossible, futureWeight]);

  // 5. THE COMPONENT VIEW (JSX)
  // Our UI Pattern
  // Using declarative JSX vs Imperative JS to describe What layout looks like using standard mapping
  // Opposed to HOW to append HTML elements, it outputs identical blocks of layout components synced natively
  return (
    <div className="bg-[#E7D8C4] flex items-center justify-center min-h-screen p-4 font-sans text-[#333333]">
      <main className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-6 md:p-10 border border-[#d9c9b4]">

        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Grade Quackulator <span className="inline-block animate-bounce" role="img" aria-label="A cheerful cartoon duck">🦆</span>
          </h1>
          <p className="mt-2 text-md text-[#333333]">
            A professional-grade tool to brew your grades to perfection!
          </p>
        </header>

        <div className="space-y-6">

          {/* Dynamic Assignment List Array */}
          <div className="space-y-4">
            {assignments.map((assignment, index) => (
              <div key={assignment.id} className="p-5 bg-[#f0e8dc] rounded-xl shadow-sm border border-[#d9c9b4] space-y-4">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="font-bold text-lg text-[#2E4A3F]">Assignment #{index + 1}</h2>
                  <button
                    onClick={() => removeAssignment(assignment.id)}
                    className="text-[#2E4A3F] hover:text-[#b34040]"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#333333]">Points Earned</label>
                    <input
                      type="number"
                      value={assignment.earned}
                      onChange={(e) => handleInputChange(assignment.id, 'earned', e.target.value)}
                      className="mt-1 block w-full rounded-md border-[#bdae9c] p-2 focus:border-[#D4A5A5] focus:ring focus:ring-[#D4A5A5] focus:ring-opacity-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#333333]">Points Possible</label>
                    <input
                      type="number"
                      value={assignment.possible}
                      onChange={(e) => handleInputChange(assignment.id, 'possible', e.target.value)}
                      className="mt-1 block w-full rounded-md border-[#bdae9c] p-2 focus:border-[#D4A5A5] focus:ring focus:ring-[#D4A5A5] focus:ring-opacity-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#333333]">Weight (%)</label>
                    <input
                      type="number"
                      value={assignment.weight}
                      onChange={(e) => handleInputChange(assignment.id, 'weight', e.target.value)}
                      className="mt-1 block w-full rounded-md border-[#bdae9c] p-2 focus:border-[#D4A5A5] focus:ring focus:ring-[#D4A5A5] focus:ring-opacity-50"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Action Control Buttons */}
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 mt-8">
            <button
              onClick={addAssignment}
              className="w-full sm:w-auto px-6 py-3 font-semibold text-white bg-[#D4A5A5] rounded-xl hover:bg-[#c49494] transition-colors shadow-lg"
            >
              Add Another Assignment
            </button>
            <button
              onClick={clearAll}
              className="w-full sm:w-auto px-6 py-3 font-semibold text-[#333333] bg-[#d8c8b4] rounded-xl hover:bg-[#c9b9a6] transition-colors shadow-lg"
            >
              Clear All
            </button>
          </div>

          {/* Current Grade Panel Output */}
          <section className="mt-8 pt-6 border-t border-[#d9c9b4]">
            <div className="flex flex-col items-center justify-center p-6 bg-[#f0e8dc] rounded-xl border border-dashed border-[#d9c9b4]">
              <p className="text-lg text-[#2E4A3F] font-semibold">{currentGrade}</p>
            </div>
          </section>

          {/* Grade Goal Calculator Section */}
          <section id="goal-section" className="mt-8 pt-6 border-t border-[#d9c9b4]">
            <h2 className="text-2xl md:text-3xl font-bold text-[#333333] text-center mb-4">Grade Goal Calculator</h2>
            <div className="p-6 bg-[#f0e8dc] rounded-xl border border-dashed border-[#d9c9b4]">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                <div>
                  <label htmlFor="target-grade" className="block text-sm font-medium text-[#333333]">Target Grade (%)</label>
                  <input
                    type="number"
                    value={targetGrade}
                    onChange={(e) => setTargetGrade(e.target.value)}
                    className="mt-1 block w-full rounded-md border-[#bdae9c] p-2 shadow-sm focus:border-[#D4A5A5] focus:ring focus:ring-[#D4A5A5] focus:ring-opacity-50"
                    placeholder="90"
                  />
                </div>
                <div>
                  <label htmlFor="future-points-possible" className="block text-sm font-medium text-[#333333]">Future Pts Possible</label>
                  <input
                    type="number"
                    value={futurePointsPossible}
                    onChange={(e) => setFuturePointsPossible(e.target.value)}
                    className="mt-1 block w-full rounded-md border-[#bdae9c] p-2 shadow-sm focus:border-[#D4A5A5] focus:ring focus:ring-[#D4A5A5] focus:ring-opacity-50"
                    placeholder="100"
                  />
                </div>
                <div>
                  <label htmlFor="future-weight" className="block text-sm font-medium text-[#333333]">Future Weight (%)</label>
                  <input
                    type="number"
                    value={futureWeight}
                    onChange={(e) => setFutureWeight(e.target.value)}
                    className="mt-1 block w-full rounded-md border-[#bdae9c] p-2 shadow-sm focus:border-[#D4A5A5] focus:ring focus:ring-[#D4A5A5] focus:ring-opacity-50"
                    placeholder="20"
                  />
                </div>
              </div>
              <div id="goal-result" className="text-center font-semibold text-lg text-[#2E4A3F]">
                {goalResult}
              </div>
            </div>
          </section>

        </div>
      </main>
    </div>
  );


