import { toPng } from 'html-to-image';
export const convertChartToImage = async (chartRef) => {
  if (chartRef.current) {
    const dataUrl = await toPng(chartRef.current);
    return dataUrl;
  }
  return null;
};
