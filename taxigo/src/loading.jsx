
// export default MyComponent;
import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';

const Loading = () => {
  const box1 = useRef(null);
  const box2 = useRef(null);
  const container = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Loading animation for progress
    gsap.to({}, {
      duration: 1, // Total time for loading animation
      onUpdate: function () {
        setProgress(Math.round(this.progress() * 100));
      },
      onComplete: () => console.log("Loading complete!")
    });

    // Random velocity generator for bouncing animation
    const getRandomVelocity = () => ({
      x: Math.random() * 5 + 2, // Random speed between 2 and 8
      y: Math.random() * 5 + 2
    });

    // Initialize random velocities for both boxes
    let velocity1 = getRandomVelocity();
    let velocity2 = getRandomVelocity();

    const animateBox = (boxRef, velocity) => {
      const box = boxRef.current;
      const containerRect = container.current.getBoundingClientRect();

      gsap.ticker.add(() => {
        const boxRect = box.getBoundingClientRect();

        // Check for horizontal boundaries and reverse direction if necessary
        if (boxRect.right >= containerRect.right || boxRect.left <= containerRect.left) {
          velocity.x *= -1;
        }

        // Check for vertical boundaries and reverse direction if necessary
        if (boxRect.bottom >= containerRect.bottom || boxRect.top <= containerRect.top) {
          velocity.y *= -1;
        }

        // Move the box by the current velocity
        gsap.set(box, {
          x: `+=${velocity.x}`,
          y: `+=${velocity.y}`,
        });
      });
    };

    // Start the animation for each box with their respective velocities
    animateBox(box1, velocity1);
    animateBox(box2, velocity2);
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <div ref={container} style={{ position: "relative", margin: 'auto', width: "300px", height: "300px", border: "1px solid white", overflow: "hidden" }}>
      {/* Centered loading text and progress bar */}
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", textAlign: 'center', fontFamily: "cursive", fontSize: "16px" }}>
        <div>Loading_{progress}%</div>
        <div style={{ width: '200px', height: '10px', border: '2px solid white', marginTop: '10px' }}>
          <div style={{ width: `${progress}%`, height: '100%', borderRadius: '4px', backgroundColor: 'orange' }}></div>
        </div>
      </div>

      {/* Bouncing boxes */}
      <div ref={box1} style={{ position: "absolute", opacity:'.8',width: "50px", height: "50px", background: "blue", borderRadius: '50%', top: 0, left: 0 }}></div>
      <div ref={box2} style={{ position: "absolute", opacity:'.7',width: "50px", height: "50px", background: "red", borderRadius: '50%', top: 0, left: 50 }}></div>
    </div>
     </div>
  );
};

export default Loading;
