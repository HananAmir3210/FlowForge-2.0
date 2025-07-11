
import { toPng } from 'html-to-image';

export const exportWorkflowToPNG = async (workflowTitle: string, elementId?: string) => {
  try {
    // Find the workflow canvas element
    const workflowElement = elementId 
      ? document.getElementById(elementId)
      : document.querySelector('.react-flow__viewport') as HTMLElement;
    
    if (!workflowElement) {
      throw new Error('Workflow element not found');
    }

    // Generate PNG from the workflow element
    const dataUrl = await toPng(workflowElement, {
      quality: 1.0,
      pixelRatio: 2,
      backgroundColor: '#ffffff',
      width: 1920,
      height: 1080,
    });

    // Create download link
    const link = document.createElement('a');
    link.download = `${workflowTitle.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_workflow.png`;
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    return true;
  } catch (error) {
    console.error('Error exporting workflow to PNG:', error);
    throw error;
  }
};
