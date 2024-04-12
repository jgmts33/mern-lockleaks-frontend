import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CustomQuill = ({ value, onChange }) => {
  return (
    <ReactQuill
    style={{ backgroundColor: 'lightblue',borderRadius:"10px" }}
      value={value}
      onChange={onChange}
      modules={{
        toolbar: [
          [{ header: [1, 2, false] }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['link', 'image', 'video'],
          ['clean'],
        ],
      }}
    />
  );
};

export default CustomQuill;