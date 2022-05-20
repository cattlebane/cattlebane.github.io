import BuildModule from './BuildModule/BuildModule';

const BuildModules = (props) => {
  const { builds } = props;

  return (
    <section>
      <ul className="units-container">
        {builds ? (
          builds.map((build) => (
            <BuildModule key={`module_${build.id}`} build={build} />
          ))
        ) : (
          <h2>LOADING</h2>
        )}
      </ul>
    </section>
  );
};

export default BuildModules;
