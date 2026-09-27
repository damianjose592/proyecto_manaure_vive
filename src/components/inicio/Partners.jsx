import '../../styles/inicio/Partners.css';
import { conveniosEcoturismo } from '../../utils/inicio/Ecoturismo.utils';

function Partners() {
  return (
    <section className="partners" id="convenios" data-reveal="section">
      <div className="partners-inner">
        <div className="partners-head" data-reveal="heading">
          <div>
            <span className="eyebrow">NUESTROS CONVENIOS</span>
            <h2>Quienes hacen posible esta experiencia</h2>
            <p>Conoce a los locales y emprendedores que ofrecen cada una de las experiencias en Manaure.</p>
          </div>
        </div>

        <div className="partner-grid" aria-label="Convenios de Manaure Vive">
          <div className="partner-track">
            {[...conveniosEcoturismo, ...conveniosEcoturismo].map((convenio, index) => {
              const duplicado = index >= conveniosEcoturismo.length;
              return (
                <a
                  className="partner"
                  key={`${convenio.nombre}-${index}`}
                  data-reveal="item"
                  href={convenio.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Instagram de ${convenio.nombre}`}
                  {...(duplicado ? { 'aria-hidden': 'true', tabIndex: -1 } : {})}
                >
                  <div className="partner-logo-wrap">
                    <img
                      className="partner-logo"
                      src={`${process.env.PUBLIC_URL}/assets/partners/${convenio.logo}`}
                      alt=""
                      loading="lazy"
                    />
                  </div>
                  <h3>{convenio.nombre}</h3>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Partners;
