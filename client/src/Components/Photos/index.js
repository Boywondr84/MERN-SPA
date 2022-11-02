// photo-port has list of photos used to create photos on pages this is from that
import React, { useState } from 'react';
import Modal from '../Modal';

const PhotoList = ({ group }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPhoto, setCurrentPhoto] = useState();

  //   where does this go from 20.5.4 just over halfway down page doesnt say where it goes
  //   {isModalOpen && <Modal currentPhoto={currentPhoto} />}
  const [photos] = useState([
    // category: 'commercial', 
    {
      name: 'choco',
      category: 'Cookies',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ultricie'
    },
    {
      name: 'gingersnaps',
      category: 'Cookies',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ultricie'
    },
    {
      name: 'oatmeal',
      category: 'Cookies',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ultricie'
    },
    {
      name: 'snickerdoodle',
      category: 'Cookies',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ultricie'
    },

  ]);

  const currentPhotos = photos.filter(photo => photo.category === "Cookies");

  const toggleModal = (image, i) => {
    setCurrentPhoto({ ...image, index: i });
    setIsModalOpen(!isModalOpen);
  }

  return (
    <div>
      {console.log(currentPhotos)}
      <div className="flex-row">
        {group.map((image, i) => {
          console.log(image, i)
          return (
            <>
              <img
                //   src={require(`../../assets/small/${category}/${i}.jpg`)}
                src={image.image[0]}
                alt={image.name}
                className="img-thumbnail mx-1"
                onClick={() => toggleModal(image, i)}
                key={image.name}
              />
            </>
          )
        }
        )}
      </div>
    </div>
  );
};

export default PhotoList;


