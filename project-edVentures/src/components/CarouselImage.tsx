

interface Props {
    image: string;
}

export default function CarouselImage({image}: Props) {
  return (
    <div>
        <div className='img-layer rounded'>
            <img src={image} alt="Image" className='rounded' style={{opacity: 0.4, maxHeight: "360px", minWidth:"100%"}}/>
        </div>
    </div>
  )
}
