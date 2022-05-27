import { TestBed } from '@angular/core/testing';

import { SsResolver } from './ss.resolver';

describe('SsResolver', () => {
  let resolver: SsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(SsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
