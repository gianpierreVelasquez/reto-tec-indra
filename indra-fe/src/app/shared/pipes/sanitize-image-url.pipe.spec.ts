import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { TestBed } from '@angular/core/testing';
import { SanitizeImageUrlPipe } from './sanitize-image-url.pipe';

describe('SanitizeImageUrlPipe', () => {
  let pipe: SanitizeImageUrlPipe;
  let sanitizer: DomSanitizer;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SanitizeImageUrlPipe,
        {
          provide: DomSanitizer,
          useValue: {
            bypassSecurityTrustUrl: (url: string): SafeUrl => `safe:${url}`
          }
        }
      ]
    });

    pipe = TestBed.inject(SanitizeImageUrlPipe);
    sanitizer = TestBed.inject(DomSanitizer);

    spyOn(sanitizer, 'bypassSecurityTrustUrl').and.callThrough();
  });

  it('Create pipe instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('Should sanitize image URL', () => {
    const url = 'https://picsum.photos/200/300';
    const sanitizedUrl = pipe.transform(url);

    expect(sanitizedUrl).toBe(`safe:${url}`);
    expect(sanitizer.bypassSecurityTrustUrl).toHaveBeenCalledOnceWith(url);
  });
});
