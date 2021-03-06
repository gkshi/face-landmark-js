import { AnnotatedPrediction } from '@tensorflow-models/face-landmarks-detection/dist/mediapipe-facemesh'

interface DrawMeshProps {
  predictions: AnnotatedPrediction[],
  ctx: CanvasRenderingContext2D
}

export const drawMesh = ({ predictions, ctx }: DrawMeshProps) => {
  if (predictions && predictions.length > 0) {
    predictions.forEach(prediction => {
      const keypoints = prediction.scaledMesh
      // @ts-ignore
      for (let i = 0; i < keypoints.length; i++) {
        const x = keypoints[i][0]
        const y = keypoints[i][1]
        ctx.beginPath()
        ctx.arc(x, y, 1, 0, 3 * Math.PI)
        ctx.fillStyle = 'aqua'
        ctx.fill()
      }
    })
  }
}

export default { drawMesh }
