export function VideoBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto -translate-x-1/2 -translate-y-1/2 object-contain"
      >
        <source src="/Cierra_al_salir.mp4" type="video/mp4" />
      </video>
    </div>
  )
}
