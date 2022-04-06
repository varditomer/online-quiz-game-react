import { useRef, useState } from 'react';

export default function Start({ setUsername }) {
  const [leaderboard, setLeaderboard] = useState(false);

  const inputRef = useRef();

  const handleClick = () => {
    inputRef.current.value && setUsername(inputRef.current.value);
  };



  return (
    <div className='Start'>
      {
        !leaderboard ?
      <div>
      <input
        type='text'
        className='startInput'
        placeholder='Enter your name'
        ref={inputRef}
      />
      <button className='startButton' onClick={handleClick}>
        Start
      </button>
      <button className='startButton' onClick={() => setLeaderboard(true)}>
        Leaderboard
      </button>
      </div>
      :
      <div>
      <table class="table text-white">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Questions</th>
            <th scope="col">Life Lines</th>
            <th scope="col">Money</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <th scope="row">dave</th>
            <td>5/15</td>
            <td>1</td>
            <td>750$</td>
          </tr>
          </tbody>
      </table>
      <button className='startButton' onClick={() => setLeaderboard(false)}>
        close
      </button>
            </div>
}
    </div>
  );
}
