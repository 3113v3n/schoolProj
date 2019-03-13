
export const updateProgress = (oldProgress, updatedProgress) => {
  return {
    ...oldProgress,
    ...updatedProgress
  };
};
