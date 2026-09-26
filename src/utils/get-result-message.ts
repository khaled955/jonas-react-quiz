export function getResultMessage(
  points: number,
  highscore: number,
  percentage: number,
) {
  if (points > highscore) {
    return "New high score! You're getting better! 🏆🔥";
  }

  if (points === highscore && points > 0) {
    return "You matched your high score! 🎯";
  }

  if (percentage === 100) return "Perfect score! Outstanding! 💯🏆";
  if (percentage >= 80) return "Excellent work! Almost perfect! 🎉";
  if (percentage >= 60) return "Good job! Keep improving! 😊";
  if (percentage >= 40) return "Nice try! You can do even better! 👍";

  return "Keep practicing and try again! 💪";
}
