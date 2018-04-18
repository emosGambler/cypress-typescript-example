
import { testData, timeout, commonData } from './../fixtures/sample.data';
import * as using from 'jasmine-data-provider';

describe('Google', () => {
    testData.forEach(d => {
        context(`Search with query '${d.query}'`, () => {
        
            before(() => {
                cy.visit('/');
            });

            it('should url be correct', () => {
                cy.contains('type').click();
                expectoPatronum(cy.url(), 'to.include', commonData.google_url);
            });
    
            it('should query be searched', () => {
                cy.get('input.gsfi').first()
                    .type(`${d.query}`);
                cy.wait(timeout.short);
                cy.get('ul[role="listbox"] > li').first().click();
                
                expectoPatronum(cy.get('h3 > a'), 'to.have.length', d.number_of_results);
            });
            
            it('should first result have correct title', () => {
                /*cy.get('h3 > a').first().then(el => {
                    expect(el.text()).to.eq(d.first_link_text);
                });*/
            });

            it('should switch to videos tab', () => {
                cy.contains('Filmy').click();
                
                expectoPatronum(cy.get('a img'), 'to.have.length', d.number_of_videos);
            });

        });
    });
    
    context('Search with commands', () => {
        
        before(() => {
            cy.searchQuery('cypress io');
        });
        
        it('should use commands for searching query', () => {
            expectoPatronum(cy.get('h3 > a'), 'to.have.length', 13);
        });
    });
    
    function expectoPatronum(element, condition, param) {
        element.should(condition.replace('to.', ''), param);
    };
});