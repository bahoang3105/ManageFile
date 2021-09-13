const Other = ({ type }) => {
  return (
    <div>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style={{ height: '8%', width:'8%'}} role="img">
        <path fill="var(--ci-primary-color, currentColor)" d="M334.627,16H48V496H472V153.373ZM440,166.627V168H320V48h1.373ZM80,464V48H288V200H440V464Z" class="ci-primary"></path>
      </svg>
      <br/>
      &nbsp;&nbsp;&nbsp;<strong>{type}</strong> &nbsp;&nbsp;&nbsp;&nbsp;file isn't supported to preview!
    </div>
  );
}

export default Other;