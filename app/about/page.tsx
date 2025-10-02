'use client';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-50 to-yellow-50 py-20">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{
            backgroundImage: `url('https://readdy.ai/api/search-image?query=Modern%20Saudi%20Arabian%20business%20meeting%20with%20diverse%20professionals%20in%20traditional%20and%20modern%20attire%20collaborating%20in%20a%20bright%20conference%20room%20with%20Saudi%20Arabia%20flag%20elements%2C%20handshakes%20and%20partnership%20symbols%2C%20professional%20corporate%20environment%20with%20clean%20white%20background%20and%20green%20and%20golden%20accents%20representing%20business%20success%20and%20Vision%202030&width=1920&height=800&seq=about-hero-saudi&orientation=landscape')`
          }}
        ></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Saudi Flag and Pride Section */}
          <div className="flex justify-center items-center mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-8 bg-green-600 flex items-center justify-center relative overflow-hidden rounded">
                <div className="w-full h-full bg-green-600 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                      <div className="w-4 h-4 text-green-600 text-xs font-bold flex items-center justify-center">
                        <span className="text-[8px] leading-none">لا إله إلا الله محمد رسول الله</span>
                      </div>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-white flex items-center justify-center">
                    <div className="text-green-600 text-[6px] font-bold">السيف</div>
                  </div>
                </div>
              </div>
              <div className="text-lg font-bold text-green-600">100% Saudi Made</div>
              <div className="w-12 h-8 bg-green-600 flex items-center justify-center relative overflow-hidden rounded">
                <div className="w-full h-full bg-green-600 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                      <div className="w-4 h-4 text-green-600 text-xs font-bold flex items-center justify-center">
                        <span className="text-[8px] leading-none">لا إله إلا الله محمد رسول الله</span>
                      </div>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-white flex items-center justify-center">
                    <div className="text-green-600 text-[6px] font-bold">السيف</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            About Supplier.sa
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed mb-8">
            We are the first platform and website that gets B2B connected. We are the number 1 website where all businesses meet, creating opportunities and fostering growth across Saudi Arabia.
          </p>
          
          {/* Saudi Pride Statement */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 max-w-4xl mx-auto border border-green-100">
            <div className="flex items-center justify-center mb-4">
              <i className="ri-heart-fill text-3xl text-red-500 mr-3"></i>
              <h2 className="text-2xl font-bold text-green-600">Proud to be Saudi</h2>
              <i className="ri-heart-fill text-3xl text-red-500 ml-3"></i>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed">
              We are 100% Saudi and proud to be Saudi. Our website is made in Saudi Arabia, by Saudis, for Saudis. 
              We are committed to supporting Vision 2030 by empowering local businesses and strengthening our local 
              communities across the Kingdom.
            </p>
          </div>
        </div>
      </section>

      {/* Vision 2030 Support Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-yellow-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white mb-16">
            <div className="flex items-center justify-center mb-6">
              <img 
                src="https://readdy.ai/api/search-image?query=Saudi%20Arabia%20Vision%202030%20logo%20design%20with%20modern%20geometric%20patterns%20in%20green%20and%20gold%20colors%2C%20clean%20white%20background%2C%20professional%20corporate%20branding%20style%20representing%20economic%20transformation%20and%20business%20growth&width=120&height=80&seq=vision-2030-logo&orientation=landscape"
                alt="Vision 2030"
                className="h-16 object-contain mr-4"
              />
              <h2 className="text-4xl font-bold">Supporting Vision 2030</h2>
            </div>
            <p className="text-xl text-green-100 max-w-4xl mx-auto leading-relaxed">
              Aligned with Saudi Arabia's Vision 2030, we are dedicated to diversifying the economy, 
              empowering businesses, and building a thriving digital ecosystem that serves our nation's future.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="ri-building-2-line text-3xl text-white"></i>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Economic Diversification</h3>
              <p className="text-green-100 leading-relaxed">
                Supporting the transformation from oil dependency to a diversified economy by connecting businesses across all sectors.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="ri-rocket-2-line text-3xl text-white"></i>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Digital Transformation</h3>
              <p className="text-green-100 leading-relaxed">
                Driving digital adoption among Saudi businesses, helping them embrace technology and compete globally.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="ri-team-line text-3xl text-white"></i>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Local Empowerment</h3>
              <p className="text-green-100 leading-relaxed">
                Empowering Saudi entrepreneurs and businesses to create jobs, drive innovation, and contribute to national growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-6">
                <div className="w-8 h-6 bg-green-600 flex items-center justify-center relative overflow-hidden rounded mr-4">
                  <div className="w-full h-full bg-green-600 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
                        <div className="w-3 h-3 text-green-600 text-xs font-bold flex items-center justify-center">
                          <span className="text-[6px] leading-none">لا</span>
                        </div>
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"></div>
                  </div>
                </div>
                <h2 className="text-4xl font-bold text-gray-900">Our Saudi Mission</h2>
              </div>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                To revolutionize B2B connections in Saudi Arabia by providing the most comprehensive platform where businesses discover, connect, and grow together. As a proudly Saudi company, we bridge the gap between suppliers and buyers, creating a thriving ecosystem of business partnerships that supports our local communities and contributes to Vision 2030.
              </p>
              
              {/* Local Impact Stats */}
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">5000+</div>
                  <div className="text-gray-600">Saudi Businesses</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">13</div>
                  <div className="text-gray-600">Saudi Regions</div>
                </div>
              </div>

              {/* Community Support */}
              <div className="bg-green-50 p-6 rounded-xl border border-green-100">
                <div className="flex items-center mb-4">
                  <i className="ri-community-line text-2xl text-green-600 mr-3"></i>
                  <h3 className="text-xl font-bold text-gray-900">Supporting Local Communities</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  We actively support local communities by prioritizing Saudi businesses, creating job opportunities, 
                  and contributing to the economic development of every region in the Kingdom.
                </p>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://readdy.ai/api/search-image?query=Professional%20Saudi%20Arabian%20business%20people%20in%20traditional%20thobe%20and%20modern%20business%20attire%20working%20together%20in%20a%20modern%20office%20space%20with%20Saudi%20Arabia%20flag%20in%20background%2C%20diverse%20team%20collaboration%20showing%20national%20pride%2C%20bright%20and%20professional%20environment%20with%20green%20and%20golden%20lighting%20representing%20Vision%202030%20success&width=600&height=400&seq=saudi-mission-image&orientation=landscape"
                alt="Our Saudi Mission"
                className="w-full h-96 object-cover object-top rounded-2xl shadow-lg"
              />
              
              {/* Saudi Elements Overlay */}
              <div className="absolute top-4 right-4 flex space-x-2">
                <div className="w-8 h-6 bg-green-600 flex items-center justify-center relative overflow-hidden rounded shadow-lg">
                  <div className="w-full h-full bg-green-600 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-4 h-4 bg-white rounded-full"></div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-white"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <i className="ri-map-pin-2-fill text-3xl text-green-600 mr-3"></i>
              <h2 className="text-4xl font-bold text-gray-900">Why Choose Saudi's #1 Platform?</h2>
              <i className="ri-map-pin-2-fill text-3xl text-green-600 ml-3"></i>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              As the pioneering B2B platform made in Saudi Arabia, we offer unmatched advantages for your business growth
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow border border-green-100">
              <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                <i className="ri-flag-2-fill text-2xl text-green-600"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">100% Saudi Made</h3>
              <p className="text-gray-700 leading-relaxed">
                Proudly developed in Saudi Arabia by Saudi talent, understanding local business culture and needs like no other platform.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow border border-green-100">
              <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                <i className="ri-trophy-line text-2xl text-green-600"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">First Platform</h3>
              <p className="text-gray-700 leading-relaxed">
                We are the first platform and website that gets B2B connected in Saudi Arabia, setting the standard for business networking.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow border border-green-100">
              <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                <i className="ri-global-line text-2xl text-green-600"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Number 1 Platform</h3>
              <p className="text-gray-700 leading-relaxed">
                We are the number 1 website where all businesses meet, providing the largest network of verified Saudi suppliers and buyers.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow border border-green-100">
              <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                <i className="ri-eye-2-line text-2xl text-green-600"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Vision 2030 Aligned</h3>
              <p className="text-gray-700 leading-relaxed">
                Supporting Saudi Arabia's Vision 2030 goals by driving digital transformation and economic diversification.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow border border-green-100">
              <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                <i className="ri-community-line text-2xl text-green-600"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Local Community Focus</h3>
              <p className="text-gray-700 leading-relaxed">
                Dedicated to empowering Saudi businesses and supporting local communities across all 13 regions of the Kingdom.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow border border-green-100">
              <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                <i className="ri-shield-check-line text-2xl text-green-600"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Verified Saudi Businesses</h3>
              <p className="text-gray-700 leading-relaxed">
                All businesses undergo thorough verification with local compliance, ensuring trustworthy Saudi partnerships.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <div className="w-8 h-6 bg-green-600 flex items-center justify-center relative overflow-hidden rounded mr-4">
                <div className="w-full h-full bg-green-600 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-white"></div>
                </div>
              </div>
              <h2 className="text-4xl font-bold text-gray-900">Saudi Success Stories</h2>
              <div className="w-8 h-6 bg-green-600 flex items-center justify-center relative overflow-hidden rounded ml-4">
                <div className="w-full h-full bg-green-600 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-white"></div>
                </div>
              </div>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real Saudi businesses, real results. See how our platform has empowered local enterprises across the Kingdom
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-gradient-to-br from-green-50 to-yellow-50 p-8 rounded-2xl border border-green-100">
              <div className="flex items-center mb-6">
                <img 
                  src="https://readdy.ai/api/search-image?query=Professional%20Saudi%20Arabian%20businessman%20in%20traditional%20white%20thobe%20and%20red%20checkered%20ghutrah%20smiling%20confidently%20in%20modern%20office%20setting%20with%20Saudi%20flag%20elements%2C%20clean%20corporate%20background%20representing%20business%20leadership%20and%20national%20pride&width=80&height=80&seq=saudi-success-1&orientation=squarish"
                  alt="Ahmed Al-Rashid"
                  className="w-16 h-16 rounded-full object-cover object-top mr-4"
                />
                <div>
                  <h4 className="text-xl font-bold text-gray-900">Ahmed Al-Rashid</h4>
                  <p className="text-gray-600">CEO, Al-Rashid Trading Co. - Riyadh</p>
                  <div className="flex items-center mt-2">
                    <div className="w-4 h-3 bg-green-600 rounded-sm mr-2"></div>
                    <span className="text-sm text-green-600 font-medium">Saudi Business Owner</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                "As a Saudi platform made by Saudis for Saudis, Supplier.sa truly understands our business culture. Within 3 months, we expanded our supplier network by 300% and increased revenue by 150%. Supporting Vision 2030 has never been easier!"
              </p>
              <div className="flex items-center text-green-600">
                <i className="ri-star-fill mr-1"></i>
                <i className="ri-star-fill mr-1"></i>
                <i className="ri-star-fill mr-1"></i>
                <i className="ri-star-fill mr-1"></i>
                <i className="ri-star-fill mr-2"></i>
                <span className="text-gray-600">5.0 Rating</span>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-yellow-50 p-8 rounded-2xl border border-green-100">
              <div className="flex items-center mb-6">
                <img 
                  src="https://readdy.ai/api/search-image?query=Professional%20Saudi%20Arabian%20businesswoman%20wearing%20elegant%20black%20abaya%20and%20hijab%20smiling%20warmly%20in%20modern%20corporate%20office%20with%20Saudi%20elements%2C%20clean%20background%20representing%20female%20business%20leadership%20and%20empowerment%20in%20Saudi%20Arabia&width=80&height=80&seq=saudi-success-2&orientation=squarish"
                  alt="Fatima Al-Zahra"
                  className="w-16 h-16 rounded-full object-cover object-top mr-4"
                />
                <div>
                  <h4 className="text-xl font-bold text-gray-900">Fatima Al-Zahra</h4>
                  <p className="text-gray-600">Founder, Zahra Manufacturing - Jeddah</p>
                  <div className="flex items-center mt-2">
                    <div className="w-4 h-3 bg-green-600 rounded-sm mr-2"></div>
                    <span className="text-sm text-green-600 font-medium">Saudi Entrepreneur</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                "I'm proud to be part of a platform that's 100% Saudi made. The local support and understanding of our market made all the difference. This platform truly empowers Saudi women in business and supports our local communities."
              </p>
              <div className="flex items-center text-green-600">
                <i className="ri-star-fill mr-1"></i>
                <i className="ri-star-fill mr-1"></i>
                <i className="ri-star-fill mr-1"></i>
                <i className="ri-star-fill mr-1"></i>
                <i className="ri-star-fill mr-2"></i>
                <span className="text-gray-600">5.0 Rating</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-yellow-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="w-12 h-8 bg-white rounded flex items-center justify-center mr-4">
              <div className="w-8 h-6 bg-green-600 flex items-center justify-center relative overflow-hidden rounded">
                <div className="w-full h-full bg-green-600 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-white"></div>
                </div>
              </div>
            </div>
            <h2 className="text-4xl font-bold text-white">
              Join Saudi's Leading B2B Platform
            </h2>
            <div className="w-12 h-8 bg-white rounded flex items-center justify-center ml-4">
              <div className="w-8 h-6 bg-green-600 flex items-center justify-center relative overflow-hidden rounded">
                <div className="w-full h-full bg-green-600 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-white"></div>
                </div>
              </div>
            </div>
          </div>
          <p className="text-xl text-green-100 mb-8 max-w-4xl mx-auto">
            Join thousands of Saudi businesses already growing their network on Supplier.sa - the first and number 1 platform 
            where all businesses meet. Proudly Saudi, supporting Vision 2030, empowering local communities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-green-600 px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-colors whitespace-nowrap cursor-pointer">
              Register Your Saudi Business
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-green-600 transition-colors whitespace-nowrap cursor-pointer">
              Browse Saudi Suppliers
            </button>
          </div>
          
          {/* Vision 2030 Support Note */}
          <div className="mt-8 flex items-center justify-center text-green-100">
            <i className="ri-heart-fill text-red-400 mr-2"></i>
            <span className="text-lg">Supporting Saudi Vision 2030 • Empowering Local Communities</span>
            <i className="ri-heart-fill text-red-400 ml-2"></i>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}